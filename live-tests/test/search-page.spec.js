'use strict';
const api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');

const mockSuggestionResponse = {
  'OFFICER': [
    {
      id: 30291,
      name: 'John Tobler',
    },
  ],
};

const mockSearchQueryResponse = {
  'OFFICER': [
    {
      id: 9876,
      name: 'John Wang',
      badge: '9999',
    },
  ],
};

const mockSearchQueryResponseForRecentItems = {
  'OFFICER': [
    {
      id: 8562,
      name: 'Jerome Finnigan',
      badge: '5167',
    },
  ],
  'CR': [
    {
      crid: '1002144',
      category: 'False Arrest',
      'incident_date': '2006-05-29',
    },
  ],
  'TRR': [
    {
      id: 14487,
    },
  ],
};

const mockSearchQueryResponseWithDate = {
  'DATE > CR': [
    {
      crid: '297449',
      id: '38221',
      category: 'Domestic',
      highlight: {
        summary: ['On October', 'regarding an incident that occurred'],
      },
      'incident_date': '2011-10-13',
    },
    {
      crid: '297473',
      id: '38245',
      category: 'Use Of Force',
      highlight: {
        summary: ['On July', 'an off-duty'],
      },
      'incident_date': '2009-06-13',
    },
  ],
  'DATE > TRR': [
    { id: '767' },
    { id: '773' },
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
      },
    },
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
      },
    },
  ],
  'CR': [
    {
      crid: '397449',
      id: '48221',
      category: 'Unknown',
      highlight: {
        summary: ['On July', 'an off-duty'],
      },
      'incident_date': '2009-06-13',
    },
    {
      crid: '397473',
      id: '48245',
      category: 'Domestic',
      highlight: {
        summary: ['On October', 'regarding an incident that occurred'],
      },
      'incident_date': '2011-10-13',
    },
  ],
  'TRR': [
    { id: '867' },
    { id: '873' },
  ],
};

const mockInvestigatorCRSearchResponse = {
  'INVESTIGATOR > CR': [
    {
      crid: '123456',
      id: '123456',
      category: 'Unknown',
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

const emptyPinboard = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
};

const createPinboardResponse = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': ['123456'],
  'trr_ids': [],
  'description': '',
};

const createEmptyPinboardResponse = {
  'id': 1,
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': 'Description',
};

const mockNewRecentSearchItemsResponse = [
  {
    'id': 8562,
    'name': 'Jerome Finnigan',
    'badge': '123456',
    'type': 'OFFICER',
  },
  {
    'crid': '1002144',
    'id': '1002144',
    'incident_date': '2010-05-29',
    'category': 'False Arrest',
    'type': 'CR',
  },
  {
    'id': 14487,
    'type': 'TRR',
  },
];

const officer8562 = {
  'officer_id': 8562,
  'full_name': 'Jerome Finnigan',
  'badge': '5167',
};

const cr1002144 = {
  'crid': '1002144',
  'incident_date': '2006-05-29',
  'category': 'False Arrest',
};

const trr14487 = {
  'id': 14487,
};


describe('SearchPageTest', function () {
  beforeEach(function (client, done) {
    api.cleanMock();
    api.mock('GET', '/api/v2/search-mobile/?term=123', 200, mockSearchQueryResponseForRecentItems);
    api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false', 200, {});
    this.searchPage = client.page.search();
    this.pinboardPage = client.page.pinboardPage();
    this.officerPage = client.page.officerPage();
    this.pinboardPage = client.page.pinboardPage();
    this.searchPage.navigate();
    this.searchPage.expect.element('@body').to.be.present;
    done();
  });

  afterEach(function (client, done) {
    done();
  });

  it('should show recent items', function () {
    api.mock(
      'GET', '/api/v2/search-mobile/recent-search-items/?officer_ids[]=8562&crids[]=1002144&trr_ids[]=14487',
      200,
      mockNewRecentSearchItemsResponse,
    );
    api.mock('GET', '/api/v2/mobile/officers/8562/', 200, officer8562);
    api.mock('GET', '/api/v2/mobile/cr/1002144/', 200, cr1002144);
    api.mock('GET', '/api/v2/mobile/trr/14487/', 200, trr14487);
    this.searchPage.setValue('@queryInput', '123');
    this.searchPage.section.officers.section.firstRow.click('@itemTitle');

    this.searchPage.click('@searchBreadcrumb');
    this.searchPage.setValue('@queryInput', '123');
    this.searchPage.section.crs.section.firstRow.click('@itemTitle');

    this.searchPage.click('@searchBreadcrumb');
    this.searchPage.setValue('@queryInput', '123');
    this.searchPage.section.trrs.section.firstRow.click('@itemTitle');

    this.searchPage.click('@searchBreadcrumb');
    this.searchPage.expect.element('@recentHeader').to.be.present;
    let recentItems = this.searchPage.section.recent;

    recentItems.section.firstRecentItem.expect.element('@itemTitle').text.to.equal('TRR');
    recentItems.section.firstRecentItem.expect.element('@itemSubtitle').text.to.equal('14487');
    recentItems.section.secondRecentItem.expect.element('@itemTitle').text.to.equal('False Arrest');
    recentItems.section.secondRecentItem.expect.element('@itemSubtitle').text.to.equal('CRID 1002144 • 05/29/2006');
    recentItems.section.thirdRecentItem.expect.element('@itemTitle').text.to.equal('Jerome Finnigan');
    recentItems.section.thirdRecentItem.expect.element('@itemSubtitle').text.to.equal('Badge #5167');

    this.searchPage.expect.element('@pinboardBar').text.to.equal('Your pinboard is empty');
    recentItems.section.firstRecentItem.click('@pinButton');
    recentItems.section.secondRecentItem.click('@pinButton');
    recentItems.section.thirdRecentItem.click('@pinButton');
    this.searchPage.expect.element('@pinboardBar').text.to.equal('Pinboard (3)');

    recentItems.section.firstRecentItem.click('@pinButton');
    recentItems.section.secondRecentItem.click('@pinButton');
    recentItems.section.thirdRecentItem.click('@pinButton');
    this.searchPage.expect.element('@pinboardBar').text.to.equal('Your pinboard is empty');

    this.searchPage.navigate();
    recentItems.section.firstRecentItem.expect.element('@itemTitle').text.to.equal('TRR');
    recentItems.section.firstRecentItem.expect.element('@itemSubtitle').text.to.equal('14487');
    recentItems.section.secondRecentItem.expect.element('@itemTitle').text.to.equal('False Arrest');
    recentItems.section.secondRecentItem.expect.element('@itemSubtitle').text.to.equal('CRID 1002144 • 05/29/2010');
    recentItems.section.thirdRecentItem.expect.element('@itemTitle').text.to.equal('Jerome Finnigan');
    recentItems.section.thirdRecentItem.expect.element('@itemSubtitle').text.to.equal('Badge #123456');
  });

  it('should show search page with suggested items', function () {
    api.mock('GET', '/api/v2/search-mobile/', 200, mockSuggestionResponse);
    const searchPage = this.searchPage;
    searchPage.expect.element('@queryInput').to.be.visible;
    searchPage.expect.element('@queryInput').to.have.attribute('placeholder', 'Officer name, badge number or date');

    searchPage.expect.element('@suggestedHeader').text.to.equal('SUGGESTED');

    const suggested = searchPage.section.suggested;

    const suggestedOfficer = suggested.section.officer;

    suggested.expect.section('@officer').to.have.attribute('href').which.contains('/officer/30291/john-tobler/');
    suggestedOfficer.expect.element('@label').text.to.contain('Officer');
    suggestedOfficer.expect.element('@value').text.to.contain('John Tobler');
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

      officers.section.firstRow.expect.element('@itemTitle').text.to.equal('John Wang');
      officers.section.firstRow.expect.element('@itemSubtitle').text.to.equal('Badge #9999');
    });

    it('should empty query when clear icon is tapped', function () {
      this.searchPage.setValue('@queryInput', 'wh');
      this.searchPage.expect.element('@queryInput').value.to.equal('wh');
      this.searchPage.click('@clearIcon');
      this.searchPage.expect.element('@queryInput').value.to.equal('');
    });

    it('should navigate to officer summary page when tapped', function (client) {
      this.searchPage.setValue('@queryInput', 'wh');
      this.searchPage.section.officers.section.firstRow.click('@itemTitle');
      client.assert.urlContains(this.officerPage.url(9876));
    });
  });

  context('search for Kelvin', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/search-mobile/?term=Kelvin', 200, mockInvestigatorCRSearchResponse);
      done();
    });

    it('should show results that match search query', function () {
      this.searchPage.setValue('@queryInput', 'Kelvin');

      this.searchPage.expect.element('@investigatorCRsHeader').text.to.equal('INVESTIGATOR > CR');

      const investigatorCRs = this.searchPage.section.investigatorCRs;
      investigatorCRs.section.firstRow.expect.element('@itemTitle').text.to.equal('Unknown');
      investigatorCRs.section.firstRow.expect.element('@itemSubtitle').text.to.equal('CRID 123456 • 06/13/2009');
      investigatorCRs.section.secondRow.expect.element('@itemTitle').text.to.equal('Domestic');
      investigatorCRs.section.secondRow.expect.element('@itemSubtitle').text.to.equal('CRID 654321 • 10/13/2011');
      investigatorCRs.expect.section('@thirdRow').to.be.not.present;
    });

    it('should able to show INVESTIGATOR > CR results via query parameter', function () {
      this.searchPage.navigate(this.searchPage.url('Kelvin'));

      this.searchPage.expect.element('@investigatorCRsHeader').text.to.equal('INVESTIGATOR > CR');

      const investigatorCRs = this.searchPage.section.investigatorCRs;

      investigatorCRs.section.firstRow.expect.element('@itemTitle').text.to.equal('Unknown');
      investigatorCRs.section.firstRow.expect.element('@itemSubtitle').text.to.equal('CRID 123456 • 06/13/2009');
      investigatorCRs.section.secondRow.expect.element('@itemTitle').text.to.equal('Domestic');
      investigatorCRs.section.secondRow.expect.element('@itemSubtitle').text.to.equal('CRID 654321 • 10/13/2011');
      investigatorCRs.expect.section('@thirdRow').to.be.not.present;
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
      dateCRs.section.firstRow.expect.element('@itemTitle').text.to.equal('Domestic');
      dateCRs.section.firstRow.expect.element('@itemSubtitle').text.to.equal('CRID 297449 • 10/13/2011');
      dateCRs.section.secondRow.expect.element('@itemTitle').text.to.equal('Use Of Force');
      dateCRs.section.secondRow.expect.element('@itemSubtitle').text.to.equal('CRID 297473 • 06/13/2009');
      dateCRs.expect.section('@thirdRow').to.be.not.present;

      this.searchPage.expect.element('@dateTRRsHeader').text.to.equal('DATE > TACTICAL RESPONSE REPORTS');
      const dateTRRs = this.searchPage.section.dateTRRs;
      dateTRRs.section.firstRow.expect.element('@itemTitle').text.to.equal('TRR');
      dateTRRs.section.firstRow.expect.element('@itemSubtitle').text.to.equal('767');
      dateTRRs.section.secondRow.expect.element('@itemTitle').text.to.equal('TRR');
      dateTRRs.section.secondRow.expect.element('@itemSubtitle').text.to.equal('773');
      dateTRRs.expect.section('@thirdRow').to.be.not.present;

      this.searchPage.expect.element('@officersHeader').text.to.equal('OFFICERS');
      const officers = this.searchPage.section.officers;
      officers.section.firstRow.expect.element('@itemTitle').text.to.equal('William Eaker');
      officers.section.firstRow.expect.element('@itemSubtitle').text.to.equal('Badge #6056');

      this.searchPage.expect.element('@crsHeader').text.to.equal('COMPLAINT RECORDS (CRs)');
      const crs = this.searchPage.section.crs;
      crs.section.firstRow.expect.element('@itemTitle').text.to.equal('Unknown');
      crs.section.firstRow.expect.element('@itemSubtitle').text.to.equal('CRID 397449 • 06/13/2009');
      crs.section.secondRow.expect.element('@itemTitle').text.to.equal('Domestic');
      crs.section.secondRow.expect.element('@itemSubtitle').text.to.equal('CRID 397473 • 10/13/2011');
      crs.expect.section('@thirdRow').to.be.not.present;

      this.searchPage.expect.element('@trrsHeader').text.to.equal('TACTICAL RESPONSE REPORTS');
      const trrs = this.searchPage.section.trrs;
      trrs.section.firstRow.expect.element('@itemTitle').text.to.equal('TRR');
      trrs.section.firstRow.expect.element('@itemSubtitle').text.to.equal('867');
      trrs.section.secondRow.expect.element('@itemTitle').text.to.equal('TRR');
      trrs.section.secondRow.expect.element('@itemSubtitle').text.to.equal('873');
      trrs.expect.section('@thirdRow').to.be.not.present;
    });

    it('should able to show DATE > OFFICERS results', function () {
      this.searchPage.setValue('@queryInput', '2004-04-23 ke');

      const dateOfficers = this.searchPage.section.dateOfficers;
      this.searchPage.waitForElementVisible('@dateCRsHeader', TIMEOUT);
      this.searchPage.expect.element('@dateOfficersHeader').text.to.equal('DATE > OFFICERS');
      dateOfficers.section.firstRow.expect.element('@itemTitle').text.to.equal('Jerome Finnigan');
      dateOfficers.section.firstRow.expect.element('@itemSubtitle').text.to.equal('Badge #6789');
    });
  });

  context('pinboard functionalities', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/search-mobile/?term=Kelvin', 200, mockInvestigatorCRSearchResponse);
      api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false', 200, {});
      api.mockPost(
        '/api/v2/mobile/pinboards/', 201,
        { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] },
        createPinboardResponse
      );
      api.mockPost(
        '/api/v2/mobile/pinboards/', 201,
        { 'officer_ids': [], crids: [], 'trr_ids': [] },
        createEmptyPinboardResponse
      );
      api.mockPut(
        '/api/v2/mobile/pinboards/5cd06f2b/', 200,
        { 'officer_ids': [], crids: [], 'trr_ids': [], title: '', description: '' },
        emptyPinboard
      );
      done();
    });

    it('should display pinboard button with correct text when items are added/removed', function (client) {
      this.searchPage.setValue('@queryInput', 'Kelvin');
      this.searchPage.expect.element('@pinboardBar').text.to.equal('Your pinboard is empty');

      const investigatorCRs = this.searchPage.section.investigatorCRs;

      investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@pinboardBar', TIMEOUT);
      this.searchPage.expect.element('@pinboardBar').text.to.equal('Pinboard (1)');

      investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.expect.element('@pinboardBar').text.to.equal('Your pinboard is empty');
    });

    it('should display pinboard button that links to pinboard page when pinboard is not empty', function (client) {
      this.searchPage.setValue('@queryInput', 'Kelvin');

      this.searchPage.section.investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@pinboardBar', TIMEOUT);
      this.searchPage.click('@pinboardBar');
      client.assert.urlContains('/pinboard/5cd06f2b/untitled-pinboard/');

      this.pinboardPage.waitForElementVisible('@pinboardTitle', TIMEOUT);
    });

    it('should create empty pinboard and redirect to pinboard page when \
      click on pinboard button if pinboard is empty', function (client) {
      this.searchPage.click('@pinboardBar');
      this.searchPage.waitForElementNotPresent('@pinboardBar', TIMEOUT);
      client.assert.urlContains('/pinboard/1/untitled-pinboard/');
    });

    it('should display toast in few seconds when items are added/removed', function (client) {
      this.searchPage.setValue('@queryInput', 'Kelvin');

      const investigatorCRs = this.searchPage.section.investigatorCRs;
      investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@toast', TIMEOUT);
      this.searchPage.expect.element('@toast').text.to.equal('CR added');

      this.searchPage.waitForElementNotVisible('@toast', TIMEOUT);
      investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@toast', TIMEOUT);
      this.searchPage.expect.element('@toast').text.to.equal('CR removed');
    });
  });
});
