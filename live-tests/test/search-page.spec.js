'use strict';
var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');

const mockSuggestionResponse = {
  'OFFICER': [
    {
      id: 30291,
      name: 'John Tobler'
    }
  ]
};

const mockSearchQueryResponse = {
  'OFFICER': [
    {
      id: 9876,
      name: 'John Wang',
      badge: '9999',
    }
  ]
};

const mockSearchQueryResponseWithDate = {
  'DATE > CR': [
    { crid: '297449', id: '38221' },
    { crid: '297473', id: '38245' }
  ],
  'DATE > TRR': [
    { id: '767' },
    { id: '773' }
  ],
  'DATE > OFFICERS': [
    {
      id: 1234,
      name: 'Jerome Finnigan',
      badge: '6789',
      percentile: {
        'percentile_trr': '72.1048',
        'percentile_allegation_civilian': '77.0532',
        'percentile_allegation': '96.5674',
        year: 2010,
        id: 1234,
        'percentile_allegation_internal': '98.5982',
      }
    }
  ],
  OFFICER: [
    {
      id: 7694,
      name: 'William Eaker',
      badge: '6056',
      percentile: {
        'percentile_trr': '79.1048',
        'percentile_allegation_civilian': '97.0434',
        'percentile_allegation': '98.5554',
        year: 2010,
        id: 7694,
        'percentile_allegation_internal': '88.5567',
      }
    }
  ],
  'CR': [
    { crid: '397449', id: '48221' },
    { crid: '397473', id: '48245' }
  ],
  'TRR': [
    { id: '867' },
    { id: '873' }
  ],
};


describe('SearchPageTest', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/search-mobile/', 200, mockSuggestionResponse);
    this.searchPage = client.page.search();
    this.officerPage = client.page.officerPage();
    this.searchPage.navigate();
    client.waitForElementVisible('body', TIMEOUT);
    done();
  });

  afterEach(function (client, done) {
    api.cleanMock();
    client.end(function () {
      done();
    });
  });

  it('should show search page with suggested items', function () {
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

  it('should show recent items', function () {
    this.searchPage.section.suggested.section.officer.click();
    // this officer item should now be added into "recent" list
    this.searchPage.navigate();
    this.searchPage.expect.element('@recentHeader').to.be.present;
    this.searchPage.expect.section('@recent').text.to.contain('How accurate is the data?');
  });

  context('search for wh', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/search-mobile/?term=wh', 200, mockSearchQueryResponse);
      done();
    });

    it('should show results that match search query', function () {
      this.searchPage.setValue('@queryInput', 'wh');

      this.searchPage.expect.element('@officersHeader').text.to.equal('OFFICERS');

      let officers = this.searchPage.section.officers;

      officers.section.firstRow.expect.element('@officerName').text.to.equal('John Wang');
      officers.section.firstRow.expect.element('@officerBadge').text.to.equal('Badge #9999');
    });

    it('should empty query when clear icon is tapped', function () {
      this.searchPage.setValue('@queryInput', 'wh');
      this.searchPage.expect.element('@queryInput').value.to.equal('wh');
      this.searchPage.click('@clearIcon');
      this.searchPage.expect.element('@queryInput').value.to.equal('');
    });

    it('should navigate to officer summary page when tapped', function (client) {
      this.searchPage.setValue('@queryInput', 'wh');
      this.searchPage.section.officers.section.firstRow.click();
      client.assert.urlEquals(this.officerPage.url(9876));
    });
  });

  context('search for "2004-04-23 ke"', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/search-mobile/?term=2004-04-23+ke', 200, mockSearchQueryResponseWithDate);
      done();
    });

    it('should show date > cr and date > trr results that match search query', function (client) {
      this.searchPage.setValue('@queryInput', '2004-04-23 ke');

      const dateCRs = this.searchPage.section.dateCRs;
      this.searchPage.waitForElementVisible('@dateCRsHeader', TIMEOUT);
      this.searchPage.expect.element('@dateCRsHeader').text.to.equal('DATE > COMPLAINT RECORDS');
      dateCRs.section.firstRow.expect.element('@itemType').text.to.equal('CR');
      dateCRs.section.firstRow.expect.element('@itemID').text.to.equal('297449');
      dateCRs.section.secondRow.expect.element('@itemType').text.to.equal('CR');
      dateCRs.section.secondRow.expect.element('@itemID').text.to.equal('297473');
      dateCRs.expect.section('@thirdRow').to.be.not.present;

      this.searchPage.expect.element('@dateTRRsHeader').text.to.equal('DATE > TACTICAL RESPONSE REPORTS');
      const dateTRRs = this.searchPage.section.dateTRRs;
      dateTRRs.section.firstRow.expect.element('@itemType').text.to.equal('TRR');
      dateTRRs.section.firstRow.expect.element('@itemID').text.to.equal('767');
      dateTRRs.section.secondRow.expect.element('@itemType').text.to.equal('TRR');
      dateTRRs.section.secondRow.expect.element('@itemID').text.to.equal('773');
      dateTRRs.expect.section('@thirdRow').to.be.not.present;

      this.searchPage.expect.element('@officersHeader').text.to.equal('OFFICERS');
      const officers = this.searchPage.section.officers;
      officers.section.firstRow.expect.element('@officerName').text.to.equal('William Eaker');
      officers.section.firstRow.expect.element('@officerBadge').text.to.equal('Badge #6056');

      this.searchPage.expect.element('@crsHeader').text.to.equal('COMPLAINT RECORDS');
      const crs = this.searchPage.section.crs;
      crs.section.firstRow.expect.element('@itemType').text.to.equal('CR');
      crs.section.firstRow.expect.element('@itemID').text.to.equal('397449');
      crs.section.secondRow.expect.element('@itemType').text.to.equal('CR');
      crs.section.secondRow.expect.element('@itemID').text.to.equal('397473');
      crs.expect.section('@thirdRow').to.be.not.present;

      this.searchPage.expect.element('@trrsHeader').text.to.equal('TACTICAL RESPONSE REPORTS');
      const trrs = this.searchPage.section.trrs;
      trrs.section.firstRow.expect.element('@itemType').text.to.equal('TRR');
      trrs.section.firstRow.expect.element('@itemID').text.to.equal('867');
      trrs.section.secondRow.expect.element('@itemType').text.to.equal('TRR');
      trrs.section.secondRow.expect.element('@itemID').text.to.equal('873');
      trrs.expect.section('@thirdRow').to.be.not.present;
    });

    it('should able to show DATE > OFFICERS results', function () {
      this.searchPage.setValue('@queryInput', '2004-04-23 ke');

      const dateOfficers = this.searchPage.section.dateOfficers;
      this.searchPage.waitForElementVisible('@dateCRsHeader', TIMEOUT);
      this.searchPage.expect.element('@dateOfficersHeader').text.to.equal('DATE > OFFICERS');
      dateOfficers.section.firstRow.expect.element('@officerName').text.to.equal('Jerome Finnigan');
      dateOfficers.section.firstRow.expect.element('@officerBadge').text.to.equal('Badge #6789');
    });
  });
});
