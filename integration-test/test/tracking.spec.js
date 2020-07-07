var assert = require('assert');
var api = require(__dirname + '/../mock-api');
var mockData = require(__dirname + '/../mock-data/pinboard-page');


const mockInvestigatorCRSearchResponse = {
  'INVESTIGATOR > CR': [
    {
      crid: '123456',
      id: '123456',
      category: 'Criminal Misconduct',
      highlight: {
        summary: ['On July', 'an off-duty'],
      },
      'incident_date': '2009-06-13',
    },
    {
      crid: '654321',
      id: '654321',
      category: 'Domestic',
      highlight: {
        summary: ['On October', 'regarding an incident that occurred'],
      },
      'incident_date': '2011-10-13',
    },
  ],
};

describe('Tracking', function () {
  const gaType = (client, callback) => client.execute('return (typeof window.ga);', [], callback);
  const clickyLogType = (client, callback) => client.execute('return (typeof window.clicky.log);', [], callback);
  const clicky = (client, callback) => client.execute('return window.clicky;', [], callback);
  const gaLoaded = (client, callback) => client.execute('return window.gaLoaded;', [], callback);

  it('should assign gaLoaded, ga & clicky on load', function (client) {
    api.onGet('/api/v2/mobile/officers/123/').reply(200, mockData.officer123);
    api.onGet('/api/v2/mobile/pinboards/5cd06f2b/').reply(200, mockData.pinboardData);
    this.pinboardPage = client.page.pinboardPage();
    this.pinboardPage.navigate(this.pinboardPage.url('5cd06f2b'));
    this.pinboardPage.expect.element('@body').to.be.present;

    gaType(client, function (result) {
      assert.equal(result.value, 'function');
    });
    clickyLogType(client, function (result) {
      assert.equal(result.value, 'function');
    });
    clicky(client, function (result) {
      assert.ok(result.value);
    });
    gaLoaded(client, function (result) {
      assert.equal(result.value, true);
    });
  });

  context('tracking script is unable to load', function () {
    it('should show results that match search query', function (client) {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
      this.searchPage = client.page.search();
      this.searchPage.navigate();
      this.searchPage.expect.element('@body').to.be.present;

      client.execute(function () {
        window.gaLoaded = null;
        window.clicky = null;
      });

      gaLoaded(client, function (result) {
        assert.equal(result.value, null);
      });

      this.searchPage.setValue('@queryInput', 'Kelvin');

      this.searchPage.expect.element('@investigatorCRsHeader').text.to.equal('INVESTIGATOR → CR');

      const investigatorCRs = this.searchPage.section.investigatorCRs;
      investigatorCRs.section.firstRow.expect.element('@itemTitle').text.to.equal('Criminal Misconduct');
      investigatorCRs.section.firstRow.expect.element('@itemSubtitle').text.to.equal('CRID 123456 • 06/13/2009');
      investigatorCRs.section.secondRow.expect.element('@itemTitle').text.to.equal('Domestic');
      investigatorCRs.section.secondRow.expect.element('@itemSubtitle').text.to.equal('CRID 654321 • 10/13/2011');
      investigatorCRs.expect.section('@thirdRow').to.be.not.present;
    });
  });
});
