'use strict';
var api = require(__dirname + '/../mock-api');

const mockSuggestionResponse = {
  'OFFICER': [
    {
      'url': 'https://beta.cpdb.co/officer/john-tobler/30291',
      'extra_info': 'Badge # 4169',
      'id': 30291,
      'name': 'John Tobler'
    }
  ]
};

const mockSearchQueryResponse = {
  'OFFICER': [
    {
      'url': 'https://beta.cpdb.co/officer/dummy/john-wang',
      'extra_info': 'Badge # 9999',
      'id': 9876,
      'name': 'John Wang'
    }
  ]
};


describe('SearchPageTest', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/search-mobile/', 200, mockSuggestionResponse);
    api.mock('GET', '/api/v2/search-mobile/wh/', 200, mockSearchQueryResponse);
    this.searchPage = client.page.search();
    this.officerSummaryPage = client.page.officerSummary();
    this.searchPage.navigate();
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should show search page with suggested items', function (client) {
    const searchPage = this.searchPage;

    searchPage.expect.element('@queryInput').to.be.visible;
    searchPage.expect.element('@queryInput').to.have.attribute('placeholder', 'Search');

    searchPage.expect.element('@suggestedHeader').text.to.equal('SUGGESTED');

    const suggested = searchPage.section.suggested;

    const suggestedOfficer = suggested.section.officer;


    suggested.expect.section('@officer').to.have.attribute('href').which.contains('/officer/30291/');
    suggestedOfficer.expect.element('@label').text.to.contain('Officer');
    suggestedOfficer.expect.element('@value').text.to.contain('John Tobler');
  });

  it('should show recent items', function (client) {
    // this report items should now be added into "recent" list
    this.searchPage.navigate();
    this.searchPage.expect.element('@recentHeader').to.be.present;
    this.searchPage.expect.section('@recent').text.to.contain('How accurate is the data?');
  });

  it('should show results that match search query', function (client) {
    this.searchPage.setValue('@queryInput', 'wh');

    this.searchPage.expect.element('@officersHeader').text.to.equal('OFFICERS');

    let officers = this.searchPage.section.officers;

    officers.expect.element('@row').text.to.contain('John Wang');
  });

  it('should empty query when clear icon is tapped', function (client) {
    this.searchPage.setValue('@queryInput', 'wh');
    this.searchPage.expect.element('@queryInput').value.to.equal('wh');
    this.searchPage.click('@clearIcon');
    this.searchPage.expect.element('@queryInput').value.to.equal('');
  });

  it('should navigate to officer summary page when tapped', function (client) {
    this.searchPage.setValue('@queryInput', 'wh');
    this.searchPage.section.officers.click('@row');
    client.assert.urlEquals(this.officerSummaryPage.url(9876));
  });
});
