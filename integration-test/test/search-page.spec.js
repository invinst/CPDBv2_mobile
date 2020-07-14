'use strict';

const assert = require('assert');
const api = require(__dirname + '/../mock-api');
const { TIMEOUT, PINBOARD_INTRODUCTION_DELAY } = require(__dirname + '/../constants');
const { range } = require('lodash');
const pinboardMockData = require(__dirname + '/../mock-data/pinboard-page');
const {
  createPinboardWithRecentItemsParams,
  createPinboardWithRecentItemsResponse,
} = require(__dirname + '/../mock-data/search');
const { mockToasts } = require(__dirname + '/../mock-data/toasts');
const { clearReduxStore } = require(__dirname + '/../utils');
const { mockGetAppConfig } = require(__dirname + '/../mock-data/app-config');


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
      'percentile_trr': '72.1048',
      'percentile_allegation_civilian': '77.0532',
      'percentile_allegation': '96.5674',
      'percentile_allegation_internal': '98.5982',
    },
  ],
  OFFICER: [
    {
      id: 7694,
      name: 'William Eaker',
      badge: '6056',
      'percentile_trr': '79.1048',
      'percentile_allegation_civilian': '97.0434',
      'percentile_allegation': '98.5554',
      'percentile_allegation_internal': '88.5567',
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

const mockOfficerSearchQueryResponse = {
  count: 35,
  next: 'http://localhost:8000/api/v2/search-mobile/single/?contentType=OFFICER&offset=30&term=2004-04-23+ke',
  previous: null,
  results: [
    {
      id: 7694,
      name: 'William Eaker',
      badge: '6056',
      'percentile_trr': '79.1048',
      'percentile_allegation_civilian': '97.0434',
      'percentile_allegation': '98.5554',
      'percentile_allegation_internal': '88.5567',
    },
    {
      id: 7695,
      name: 'Joseph Boisso',
      badge: '2308',
      'percentile_trr': '65',
      'percentile_allegation_civilian': '90',
      'percentile_allegation': '92',
      'percentile_allegation_internal': '88.5567',
    },
  ],
};

const mockFirstOfficersSearchQueryResponse = {
  count: 35,
  next: 'http://localhost:8000/api/v2/search-mobile/single/?contentType=OFFICER&offset=30&term=2004-04-23+ke',
  previous: null,
  results: range(30).map(idx => ({
    id: 7694 + idx,
    name: `William Eaker ${idx}`,
    badge: '6056',
    'percentile_trr': '79.1048',
    'percentile_allegation_civilian': '97.0434',
    'percentile_allegation': '98.5554',
    'percentile_allegation_internal': '88.5567',
  })),
};

const mockSecondOfficersSearchQueryResponse = {
  count: 35,
  next: null,
  previous: 'http://localhost:8000/api/v2/search-mobile/single/?contentType=OFFICER&limit=30&term=2004-04-23+ke',
  results: range(5).map(idx => ({
    id: 8697 + idx,
    name: `Joseph Boisso ${idx}}`,
    badge: '2308',
    'percentile_trr': '65',
    'percentile_allegation_civilian': '90',
    'percentile_allegation': '92',
    'percentile_allegation_internal': '88.5567',
  })),
};

const mockDateOfficerSearchQueryResponse = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 1234,
      name: 'Jerome Finnigan',
      badge: '6789',
      'percentile_trr': '72.1048',
      'percentile_allegation_civilian': '77.0532',
      'percentile_allegation': '96.5674',
      'percentile_allegation_internal': '98.5982',
    },
    {
      id: 7694,
      name: 'William Eaker',
      badge: '6056',
      'percentile_trr': '79.1048',
      'percentile_allegation_civilian': '97.0434',
      'percentile_allegation': '98.5554',
      'percentile_allegation_internal': '88.5567',
    },
    {
      id: 7695,
      name: 'Joseph Boisso',
      badge: '2308',
      'percentile_trr': '65',
      'percentile_allegation_civilian': '90',
      'percentile_allegation': '92',
      'percentile_allegation_internal': '88.5567',
    },
  ],
};

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

const mockNewCreatedPinboard = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': ['123456'],
  'trr_ids': [],
  'description': '',
};

const mockPinboardComplaint = [
  {
    'crid': '123456',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'category': 'Use Of Force',
  },
];

const mockComplaintPinnedItemPinboard = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': ['123456'],
  'trr_ids': [],
  'description': '',
};

const mockUpdatedComplaintPinnedItemPinboard = {
  'id': '5cd06f2b',
  'title': '',
  'officer_ids': [],
  'crids': ['123456', '654321'],
  'trr_ids': [],
  'description': '',
};

const mockPinboardComplaints = [
  {
    'crid': '123456',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'category': 'Use Of Force',
  },
  {
    'crid': '654321',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'category': 'Use Of Force',
  },
];

const mockSearchQueryLongResponse = {
  'OFFICER': [
    {
      id: 9876,
      name: 'John Wang',
      badge: '9999',
    },
    officer8562,
  ],
  'TRR': [
    { id: '767' },
    { id: '773' },
  ],
  'CR': [
    cr1002144,
    trr14487,
  ],
};

const expectResultCount = (client, rowsElement, count) => {
  client.elements(rowsElement.locateStrategy, rowsElement.selector, function (result) {
    assert.equal(result.value.length, count);
  });
};

describe('SearchPageTest', function () {
  beforeEach(function (client, done) {
    api.onGet('/api/v2/search-mobile/?term=123').reply(200, mockSearchQueryResponseForRecentItems);
    api.onGet('/api/v2/mobile/toast/').reply(200, mockToasts);
    api.onGet('/api/v2/app-config/').reply(200, mockGetAppConfig);
    this.searchPage = client.page.search();
    this.pinboardPage = client.page.pinboardPage();
    this.officerPage = client.page.officerPage();
    this.pinboardPage = client.page.pinboardPage();
    this.searchPage.navigate();
    this.searchPage.expect.element('@body').to.be.present;
    this.searchPage.waitForElementVisible('@queryInput');
    done();
  });

  it('should show recent items', function () {
    api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
    api
      .onGet('/api/v2/search-mobile/recent-search-items/?officer_ids[]=8562&crids[]=1002144&trr_ids[]=14487')
      .reply(200, mockNewRecentSearchItemsResponse);
    api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
    api.onGet('/api/v2/mobile/cr/1002144/').reply(200, cr1002144);
    api.onGet('/api/v2/mobile/trr/14487/').reply(200, trr14487);
    this.searchPage.setValue('@queryInput', '123');
    this.searchPage.section.officers.section.firstRow.click('@itemTitle');

    this.searchPage.click('@searchBreadcrumb');
    this.searchPage.section.crs.section.firstRow.click('@itemTitle');

    this.searchPage.click('@searchBreadcrumb');
    this.searchPage.section.trrs.section.firstRow.click('@itemTitle');

    this.searchPage.click('@searchBreadcrumb');
    this.searchPage.clearValue('@queryInput');
    // Empty value doesn't trigger change -> Set short query to show recent
    this.searchPage.setValue('@queryInput', '1');

    this.searchPage.expect.element('@recentHeader').to.be.present;
    let recentItems = this.searchPage.section.recent;

    recentItems.section.firstRecentItem.expect.element('@itemTitle').text.to.equal('TRR');
    recentItems.section.firstRecentItem.expect.element('@itemSubtitle').text.to.equal('14487');
    recentItems.section.secondRecentItem.expect.element('@itemTitle').text.to.equal('False Arrest');
    recentItems.section.secondRecentItem.expect.element('@itemSubtitle').text.to.equal('CRID 1002144 • 05/29/2006');
    recentItems.section.thirdRecentItem.expect.element('@itemTitle').text.to.equal('Jerome Finnigan');
    recentItems.section.thirdRecentItem.expect.element('@itemSubtitle').text.to.equal('Badge #5167');
    recentItems.section.thirdRecentItem.expect.element('@pinButtonIntroduction').to.be.present.after(
      PINBOARD_INTRODUCTION_DELAY + 500
    );

    this.searchPage.waitForElementNotVisible('@pinboardBar');
    recentItems.section.firstRecentItem.click('@pinButton');
    recentItems.section.secondRecentItem.click('@pinButton');
    recentItems.section.thirdRecentItem.click('@pinButton');
    this.searchPage.waitForElementVisible('@pinboardBar');
    this.searchPage.expect.element('@pinboardBar').text.to.equal('Pinboard (3)');

    recentItems.section.firstRecentItem.click('@pinButton');
    recentItems.section.secondRecentItem.click('@pinButton');
    recentItems.section.thirdRecentItem.click('@pinButton');
    this.searchPage.waitForElementNotVisible('@pinboardBar');

    this.searchPage.navigate();
    recentItems.section.firstRecentItem.expect.element('@itemTitle').text.to.equal('TRR');
    recentItems.section.firstRecentItem.expect.element('@itemSubtitle').text.to.equal('14487');
    recentItems.section.secondRecentItem.expect.element('@itemTitle').text.to.equal('False Arrest');
    recentItems.section.secondRecentItem.expect.element('@itemSubtitle').text.to.equal('CRID 1002144 • 05/29/2010');
    recentItems.section.thirdRecentItem.expect.element('@itemTitle').text.to.equal('Jerome Finnigan');
    recentItems.section.thirdRecentItem.expect.element('@itemSubtitle').text.to.equal('Badge #123456');
  });

  it('should keep search results after coming back from other page', function () {
    api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
    const firstOfficerRow = this.searchPage.section.officers.section.firstRow;
    this.searchPage.setValue('@queryInput', '123');

    firstOfficerRow.waitForElementVisible('@itemTitle');
    firstOfficerRow.expect.element('@itemTitle').text.to.equal('Jerome Finnigan');

    this.searchPage.section.officers.section.firstRow.click('@itemTitle');
    this.searchPage.click('@searchBreadcrumb');

    this.searchPage.getValue('@queryInput', function (result) {
      assert.equal(result.value, '123');
    });
    firstOfficerRow.waitForElementVisible('@itemTitle');
    firstOfficerRow.expect.element('@itemTitle').text.to.equal('Jerome Finnigan');
  });

  it('should clear search results after coming back from landing page', function (client) {
    const mainPage = client.page.main();

    this.searchPage.setValue('@queryInput', '123');
    this.searchPage.click('@closeButton');

    mainPage.waitForElementVisible('@title');
    mainPage.click('@searchLink');

    this.searchPage.waitForElementVisible('@queryInput');
    this.searchPage.expect.element('@queryInput').text.to.equal('');
  });

  describe('Cancel button', function () {
    it('should go back to landing page', function (client) {
      const mainPage = client.page.main();

      this.searchPage.waitForElementVisible('@closeButton');
      this.searchPage.click('@closeButton');

      client.assert.urlEquals(mainPage.url());
    });

    it('should go to pinboard page if search page was opened via pinboard page', function (client) {
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/').reply(200, pinboardMockData.pinboardData);
      const pinboardPage = client.page.pinboardPage();
      const pinboardUrl = pinboardPage.url('5cd06f2b');

      pinboardPage.navigate(pinboardUrl);
      pinboardPage.waitForElementVisible('@searchBar');
      pinboardPage.click('@searchBar');

      this.searchPage.waitForElementVisible('@closeButton');
      this.searchPage.click('@closeButton');

      client.assert.urlEquals(pinboardUrl);
    });

    it('should go to officer page if search page was opened via breadcrumbs on officer page', function (client) {
      api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
      const officerPage = client.page.officerPage();

      this.searchPage.setValue('@queryInput', '123');
      this.searchPage.section.officers.section.firstRow.waitForElementVisible('@itemTitle');
      this.searchPage.section.officers.section.firstRow.click('@itemTitle');

      officerPage.waitForElementVisible('@searchBreadcrumb');
      client.assert.urlContains('/officer/8562/jerome-finnigan/');
      officerPage.click('@searchBreadcrumb');

      this.searchPage.waitForElementVisible('@closeButton');
      client.assert.urlContains('/search/');
      this.searchPage.click('@closeButton');

      client.assert.urlContains('/officer/8562/jerome-finnigan/');
    });
  });

  context('search for wh', function () {
    beforeEach(function (client, done) {
      api.onGet('/api/v2/search-mobile/?term=wh').reply(200, mockSearchQueryResponse);
      done();
    });

    it('should show results that match search query', function () {
      this.searchPage.setValue('@queryInput', 'wh');

      this.searchPage.expect.element('@officersHeader').text.to.equal('OFFICERS');

      let officers = this.searchPage.section.officers;

      officers.section.firstRow.expect.element('@itemTitle').text.to.equal('John Wang');
      officers.section.firstRow.expect.element('@itemSubtitle').text.to.equal('Badge #9999');
    });

    it('should navigate to officer summary page when tapped', function (client) {
      this.searchPage.setValue('@queryInput', 'wh');
      this.searchPage.section.officers.section.firstRow.click('@itemTitle');
      client.assert.urlContains(this.officerPage.url(9876));
    });
  });

  context('search for Kelvin', function () {
    beforeEach(function (client, done) {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
      done();
    });

    it('should show results that match search query', function () {
      this.searchPage.setValue('@queryInput', 'Kelvin');

      this.searchPage.expect.element('@investigatorCRsHeader').text.to.equal('INVESTIGATOR → CR');

      const investigatorCRs = this.searchPage.section.investigatorCRs;
      investigatorCRs.section.firstRow.expect.element('@itemTitle').text.to.equal('Criminal Misconduct');
      investigatorCRs.section.firstRow.expect.element('@itemSubtitle').text.to.equal('CRID 123456 • 06/13/2009');
      investigatorCRs.section.secondRow.expect.element('@itemTitle').text.to.equal('Domestic');
      investigatorCRs.section.secondRow.expect.element('@itemSubtitle').text.to.equal('CRID 654321 • 10/13/2011');
      investigatorCRs.expect.section('@thirdRow').to.be.not.present;
    });

    it('should able to show INVESTIGATOR > CR results via query parameter', function () {
      this.searchPage.navigate(this.searchPage.url('q=Kelvin'));

      this.searchPage.expect.element('@investigatorCRsHeader').text.to.equal('INVESTIGATOR → CR');

      const investigatorCRs = this.searchPage.section.investigatorCRs;

      investigatorCRs.section.firstRow.expect.element('@itemTitle').text.to.equal('Criminal Misconduct');
      investigatorCRs.section.firstRow.expect.element('@itemSubtitle').text.to.equal('CRID 123456 • 06/13/2009');
      investigatorCRs.section.secondRow.expect.element('@itemTitle').text.to.equal('Domestic');
      investigatorCRs.section.secondRow.expect.element('@itemSubtitle').text.to.equal('CRID 654321 • 10/13/2011');
      investigatorCRs.expect.section('@thirdRow').to.be.not.present;
    });
  });

  context('search for "2004-04-23 ke"', function () {
    beforeEach(function (client, done) {
      api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);
      done();
    });

    it('should show date > cr and date > trr results that match search query', function () {
      this.searchPage.setValue('@queryInput', '2004-04-23 ke');

      const dateCRs = this.searchPage.section.dateCRs;
      this.searchPage.waitForElementVisible('@dateCRsHeader', TIMEOUT);
      this.searchPage.expect.element('@dateCRsHeader').text.to.equal('DATE → COMPLAINT RECORDS');
      dateCRs.section.firstRow.expect.element('@itemTitle').text.to.equal('Domestic');
      dateCRs.section.firstRow.expect.element('@itemSubtitle').text.to.equal('CRID 297449 • 10/13/2011');
      dateCRs.section.secondRow.expect.element('@itemTitle').text.to.equal('Use Of Force');
      dateCRs.section.secondRow.expect.element('@itemSubtitle').text.to.equal('CRID 297473 • 06/13/2009');
      dateCRs.expect.section('@thirdRow').to.be.not.present;

      this.searchPage.expect.element('@dateTRRsHeader').text.to.equal('DATE → TACTICAL RESPONSE REPORTS');
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
      this.searchPage.expect.element('@dateOfficersHeader').text.to.equal('DATE → OFFICERS');
      dateOfficers.section.firstRow.expect.element('@itemTitle').text.to.equal('Jerome Finnigan');
      dateOfficers.section.firstRow.expect.element('@itemSubtitle').text.to.equal('Badge #6789');
    });
  });

  context('single search', function () {
    it('should show single search result when click on "ALL"', function (client) {
      api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);
      api
        .onGet('/api/v2/search-mobile/single/?term=2004-04-23+ke&contentType=OFFICER')
        .reply(200, mockOfficerSearchQueryResponse);
      api
        .onGet('/api/v2/search-mobile/single/?term=2004-04-23+ke&contentType=DATE+%3E+OFFICERS')
        .reply(200, mockDateOfficerSearchQueryResponse);

      this.searchPage.setValue('@queryInput', '2004-04-23 ke');

      this.searchPage.waitForElementPresent('@dateCRsHeader', TIMEOUT);
      this.searchPage.expect.element('@dateTRRsHeader').to.be.present;
      this.searchPage.expect.element('@dateOfficersHeader').to.be.present;
      this.searchPage.expect.element('@crsHeader').to.be.present;
      this.searchPage.expect.element('@trrsHeader').to.be.present;
      this.searchPage.expect.element('@officersHeader').to.be.present;

      const officersRows = this.searchPage.section.officers.section.rows;
      expectResultCount(client, officersRows, 1);

      this.searchPage.section.officers.click('@allLink');

      this.searchPage.waitForElementNotPresent('@dateCRsHeader', TIMEOUT);
      this.searchPage.expect.element('@dateTRRsHeader').to.be.not.present;
      this.searchPage.expect.element('@dateOfficersHeader').to.be.not.present;
      this.searchPage.expect.element('@crsHeader').to.be.not.present;
      this.searchPage.expect.element('@trrsHeader').to.be.not.present;
      this.searchPage.expect.element('@officersHeader').to.be.present;

      this.searchPage.expect.element('@queryInput').value.to.equal('officer:2004-04-23 ke');

      expectResultCount(client, officersRows, 2);

      this.searchPage.click('@backToFullSearchLink');
      this.searchPage.waitForElementPresent('@dateCRsHeader', TIMEOUT);
      this.searchPage.expect.element('@dateTRRsHeader').to.be.present;
      this.searchPage.expect.element('@dateOfficersHeader').to.be.present;
      this.searchPage.expect.element('@crsHeader').to.be.present;
      this.searchPage.expect.element('@trrsHeader').to.be.present;
      this.searchPage.expect.element('@officersHeader').to.be.present;

      this.searchPage.expect.element('@queryInput').value.to.equal('2004-04-23 ke');

      this.searchPage.section.dateOfficers.click('@allLink');

      this.searchPage.waitForElementNotPresent('@dateCRsHeader', TIMEOUT);
      this.searchPage.expect.element('@dateTRRsHeader').to.be.not.present;
      this.searchPage.expect.element('@crsHeader').to.be.not.present;
      this.searchPage.expect.element('@trrsHeader').to.be.not.present;
      this.searchPage.expect.element('@officersHeader').to.be.not.present;
      this.searchPage.expect.element('@dateOfficersHeader').to.be.present;

      this.searchPage.expect.element('@queryInput').value.to.equal('date-officer:2004-04-23 ke');

      const dateOfficersRows = this.searchPage.section.dateOfficers.section.rows;

      expectResultCount(client, dateOfficersRows, 3);
    });

    it('should able to load more when scrolling down', function (client) {
      api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);
      api
        .onGet('/api/v2/search-mobile/single/?term=2004-04-23+ke&contentType=OFFICER')
        .reply(200, mockFirstOfficersSearchQueryResponse);
      api
        .onGet('/api/v2/search-mobile/single/?term=2004-04-23+ke&contentType=OFFICER&offset=30')
        .reply(200, mockSecondOfficersSearchQueryResponse);

      this.searchPage.setValue('@queryInput', '2004-04-23 ke');

      this.searchPage.waitForElementVisible('@dateCRsHeader', TIMEOUT);
      this.searchPage.expect.element('@dateTRRsHeader').to.be.present;
      this.searchPage.expect.element('@dateOfficersHeader').to.be.present;
      this.searchPage.expect.element('@crsHeader').to.be.present;
      this.searchPage.expect.element('@trrsHeader').to.be.present;
      this.searchPage.expect.element('@officersHeader').to.be.present;

      const officersRows = this.searchPage.section.officers.section.rows;
      client.assertCount(officersRows.selector, 1, officersRows.locateStrategy);

      this.searchPage.section.officers.click('@allLink');

      this.searchPage.waitForElementNotPresent('@dateCRsHeader', TIMEOUT);
      this.searchPage.expect.element('@dateTRRsHeader').to.be.not.present;
      this.searchPage.expect.element('@dateOfficersHeader').to.be.not.present;
      this.searchPage.expect.element('@crsHeader').to.be.not.present;
      this.searchPage.expect.element('@trrsHeader').to.be.not.present;
      this.searchPage.expect.element('@officersHeader').to.be.present;

      this.searchPage.expect.element('@queryInput').value.to.equal('officer:2004-04-23 ke');

      client.assertCount(officersRows.selector, 30, officersRows.locateStrategy);

      client.execute('scrollTo(0, 3000)');
      const newItemSelector = this.searchPage.section.officers.getRowSelector(35);
      this.searchPage.waitForElementVisible(newItemSelector, TIMEOUT);
      client.assertCount(officersRows.selector, 35, officersRows.locateStrategy);
    });

    it('should match result with search query prefix', function () {
      api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);

      this.searchPage.setValue('@queryInput', 'officer:2004-04-23 ke');

      this.searchPage.waitForElementVisible('@officersHeader', TIMEOUT);
      this.searchPage.expect.element('@dateCRsHeader').to.be.not.present;
      this.searchPage.expect.element('@dateTRRsHeader').to.be.not.present;
      this.searchPage.expect.element('@dateOfficersHeader').to.be.not.present;
      this.searchPage.expect.element('@crsHeader').to.be.not.present;
      this.searchPage.expect.element('@trrsHeader').to.be.not.present;
    });

    context('should match result with search term from url', function () {
      beforeEach(function (client, done) {
        api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);
        done();
      });

      it('should search with correct query using q', function () {
        api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);

        this.searchPage.navigate(this.searchPage.url('q=officer:2004-04-23 ke'));

        this.searchPage.waitForElementVisible('@officersHeader', TIMEOUT);
        this.searchPage.expect.element('@dateCRsHeader').to.be.not.present;
        this.searchPage.expect.element('@dateTRRsHeader').to.be.not.present;
        this.searchPage.expect.element('@dateOfficersHeader').to.be.not.present;
        this.searchPage.expect.element('@crsHeader').to.be.not.present;
        this.searchPage.expect.element('@trrsHeader').to.be.not.present;

        this.searchPage.expect.element('@queryInput').value.to.equal('officer:2004-04-23 ke');
      });

      it('should search with correct query using terms', function () {
        api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);

        this.searchPage.navigate(this.searchPage.url('terms=officer:2004-04-23 ke'));

        this.searchPage.waitForElementVisible('@officersHeader', TIMEOUT);
        this.searchPage.expect.element('@dateCRsHeader').to.be.not.present;
        this.searchPage.expect.element('@dateTRRsHeader').to.be.not.present;
        this.searchPage.expect.element('@dateOfficersHeader').to.be.not.present;
        this.searchPage.expect.element('@crsHeader').to.be.not.present;
        this.searchPage.expect.element('@trrsHeader').to.be.not.present;

        this.searchPage.expect.element('@queryInput').value.to.equal('officer:2004-04-23 ke');
      });
    });
  });

  context('pinboard functionalities', function () {
    beforeEach(function (client, done) {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
      api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
      api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=true').reply(200, emptyPinboard);
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] })
        .reply(201, createPinboardResponse);
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: [], 'trr_ids': [] })
        .reply(201, createEmptyPinboardResponse);
      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          { 'officer_ids': [], crids: [], 'trr_ids': [], title: '', description: '' }
        )
        .reply(200, emptyPinboard);
      done();
    });

    it('should display pinboard button with correct text when items are added/removed', function () {
      this.searchPage.setValue('@queryInput', 'Kelvin');

      const investigatorCRs = this.searchPage.section.investigatorCRs;
      investigatorCRs.section.firstRow.waitForElementPresent('@pinButton');
      this.searchPage.waitForElementNotVisible('@pinboardBar');

      investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@pinboardBar', TIMEOUT);
      this.searchPage.expect.element('@pinboardBar').text.to.equal('Pinboard (1)');

      investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementNotVisible('@pinboardBar');
    });

    it('should display pinboard button that links to pinboard page when pinboard is not empty', function (client) {
      this.searchPage.setValue('@queryInput', 'Kelvin');

      this.searchPage.section.investigatorCRs.section.firstRow.waitForElementVisible('@pinButton');
      this.searchPage.section.investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@pinboardBar', TIMEOUT);
      client.waitForAnimationEnd(this.searchPage.elements.pinboardBar.selector);
      this.searchPage.click('@pinboardBar');
      client.assert.urlContains('/pinboard/5cd06f2b/untitled-pinboard/');

      this.pinboardPage.waitForElementVisible('@pinboardTitle', TIMEOUT);
    });

    it('should display toast in few seconds when items are added/removed', function () {
      this.searchPage.setValue('@queryInput', 'Kelvin');

      const investigatorCRs = this.searchPage.section.investigatorCRs;
      investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@toast', TIMEOUT);
      this.searchPage.expect.element('@toast').text.to.equal('CR #123456 added to pinboard\nGo to pinboard');

      this.searchPage.waitForElementNotVisible('@toast', TIMEOUT);
      investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@toast', TIMEOUT);
      this.searchPage.expect.element('@toast').text.to.equal('CR #123456 removed from pinboard\nGo to pinboard');
    });
  });

  context('create new pinboard', function () {
    beforeEach(function (client, done) {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
      api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
      api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=true').reply(200, mockNewCreatedPinboard);
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/complaints/').reply(200, mockPinboardComplaint);
      done();
    });

    it('should go to pinboard detail page when clicking on success added toast', function (client) {
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] })
        .reply(201, createPinboardResponse);

      const crs = this.pinboardPage.section.pinnedSection.section.crs;
      this.searchPage.setValue('@queryInput', 'Kelvin');
      this.searchPage.section.investigatorCRs.section.firstRow.waitForElementVisible('@pinButton');
      this.searchPage.section.investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@toast', TIMEOUT);
      this.searchPage.expect.element('@toast').text.to.equal('CR #123456 added to pinboard\nGo to pinboard');

      client.waitForAnimationEnd(this.searchPage.elements.toast.selector);
      this.searchPage.click('@toast');
      client.assert.urlContains('/pinboard/5cd06f2b/untitled-pinboard/');
      client.assertCount(crs.section.card.selector, 1);
    });

    it('should go to pinboard detail page when clicking on error added toast', function (client) {
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] })
        .reply(500, {});
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] })
        .reply(201, createPinboardResponse);

      const crs = this.pinboardPage.section.pinnedSection.section.crs;
      this.searchPage.setValue('@queryInput', 'Kelvin');
      this.searchPage.section.investigatorCRs.section.firstRow.waitForElementVisible('@pinButton');
      this.searchPage.section.investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@toast', TIMEOUT);
      this.searchPage.expect.element('@toast').text.to.equal('CR #123456 added to pinboard\nGo to pinboard');

      client.waitForAnimationEnd(this.searchPage.elements.toast.selector);
      this.searchPage.click('@toast');
      client.assert.urlContains('/pinboard/');
      client.pause(1500);
      client.assert.urlContains('/pinboard/5cd06f2b/untitled-pinboard/');
      client.assertCount(crs.section.card.selector, 1);
    });

    it('should go to pinboard detail page when clicking on long api call added toast', function (client) {
      api
        .onPost('/api/v2/mobile/pinboards/', { 'officer_ids': [], crids: ['123456'], 'trr_ids': [] })
        .delay(1000)
        .reply(201, createPinboardResponse);

      const crs = this.pinboardPage.section.pinnedSection.section.crs;
      this.searchPage.setValue('@queryInput', 'Kelvin');
      this.searchPage.section.investigatorCRs.section.firstRow.waitForElementVisible('@pinButton');
      this.searchPage.section.investigatorCRs.section.firstRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@toast', TIMEOUT);
      this.searchPage.expect.element('@toast').text.to.equal('CR #123456 added to pinboard\nGo to pinboard');

      client.waitForAnimationEnd(this.searchPage.elements.toast.selector);
      this.searchPage.click('@toast');
      client.assert.urlContains('/pinboard/');
      client.pause(1500);
      client.assert.urlContains('/pinboard/5cd06f2b/untitled-pinboard/');
      client.assertCount(crs.section.card.selector, 1);
    });
  });

  context('update current pinboard', function () {
    it('should go to pinboard detail page when clicking on success removed toast', function (client) {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
      api
        .onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false')
        .reply(200, mockComplaintPinnedItemPinboard);
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/complaints/').reply(200, mockPinboardComplaints);
      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          { 'officer_ids': [], crids: ['123456', '654321'], 'trr_ids': [], title: '', description: '' }
        )
        .reply(200, mockUpdatedComplaintPinnedItemPinboard);

      const crs = this.pinboardPage.section.pinnedSection.section.crs;
      this.searchPage.setValue('@queryInput', 'Kelvin');
      this.searchPage.section.investigatorCRs.section.secondRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@toast', TIMEOUT);
      this.searchPage.expect.element('@toast').text.to.equal('CR #654321 added to pinboard\nGo to pinboard');

      client.waitForAnimationEnd(this.searchPage.elements.toast.selector);
      this.searchPage.click('@toast');
      client.assert.urlContains('/pinboard/5cd06f2b/untitled-pinboard/');
      client.assertCount(crs.section.card.selector, 2);
    });

    it('should go to pinboard detail page when clicking on error added toast', function (client) {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
      api
        .onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false')
        .reply(200, mockComplaintPinnedItemPinboard);
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/complaints/').reply(200, mockPinboardComplaints);
      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          { 'officer_ids': [], crids: ['123456', '654321'], 'trr_ids': [], title: '', description: '' }
        )
        .reply(500, {},);
      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          { 'officer_ids': [], crids: ['123456', '654321'], 'trr_ids': [], title: '', description: '' }
        )
        .reply(200, mockUpdatedComplaintPinnedItemPinboard,);

      const crs = this.pinboardPage.section.pinnedSection.section.crs;
      this.searchPage.setValue('@queryInput', 'Kelvin');
      this.searchPage.section.investigatorCRs.section.secondRow.waitForElementVisible('@pinButton');
      this.searchPage.section.investigatorCRs.section.secondRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@toast', TIMEOUT);
      this.searchPage.expect.element('@toast').text.to.equal('CR #654321 added to pinboard\nGo to pinboard');

      client.waitForAnimationEnd(this.searchPage.elements.toast.selector);
      this.searchPage.click('@toast');
      client.pause(1500);
      client.assert.urlContains('/pinboard/5cd06f2b/untitled-pinboard/');
      client.assertCount(crs.section.card.selector, 2);
    });

    it('should go to pinboard detail page when clicking on long api call added toast', function (client) {
      api.onGet('/api/v2/search-mobile/?term=Kelvin').reply(200, mockInvestigatorCRSearchResponse);
      api
        .onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false')
        .reply(200, mockComplaintPinnedItemPinboard);
      api.onGet('/api/v2/mobile/pinboards/5cd06f2b/complaints/').reply(200, mockPinboardComplaints);
      api
        .onPut(
          '/api/v2/mobile/pinboards/5cd06f2b/',
          { 'officer_ids': [], crids: ['123456', '654321'], 'trr_ids': [], title: '', description: '' }
        )
        .delay(1000)
        .reply(200, mockUpdatedComplaintPinnedItemPinboard);

      const crs = this.pinboardPage.section.pinnedSection.section.crs;
      this.searchPage.setValue('@queryInput', 'Kelvin');
      this.searchPage.section.investigatorCRs.section.secondRow.waitForElementVisible('@pinButton');
      this.searchPage.section.investigatorCRs.section.secondRow.click('@pinButton');
      this.searchPage.waitForElementVisible('@toast', TIMEOUT);
      this.searchPage.expect.element('@toast').text.to.equal('CR #654321 added to pinboard\nGo to pinboard');

      client.waitForAnimationEnd(this.searchPage.elements.toast.selector);
      this.searchPage.click('@toast');
      client.pause(1500);
      client.assert.urlContains('/pinboard/5cd06f2b/untitled-pinboard/');
      client.assertCount(crs.section.card.selector, 2);
    });
  });

  it('should have clicky installed', function (client) {
    const page = client.page.common();
    page.waitForElementPresent('@clickyScript');
    page.waitForElementPresent('@clickySiteIdsScript');
    page.waitForElementPresent('@clickyNoJavascriptGIF');
  });

  context('Pinboard introduction', function () {
    beforeEach(function (client, done) {
      clearReduxStore(client);
      this.searchPage.waitForElementVisible('@queryInput');
      done();
    });

    it('should display pinboard introduction on first visited', function () {
      this.searchPage.section.pinboardIntroduction.waitForElementVisible('@content');
    });

    it('should not display pinboard introduction if search query is long enough', function () {
      this.searchPage.section.pinboardIntroduction.waitForElementVisible('@content');
      this.searchPage.setValue('@queryInput', 'long');
      this.searchPage.section.pinboardIntroduction.waitForElementNotPresent('@content');
      this.searchPage.clearValue('@queryInput');
      this.searchPage.setValue('@queryInput', '1');
      this.searchPage.section.pinboardIntroduction.waitForElementVisible('@content');
    });

    it('should display again after user remove all pinned items', function () {
      api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
      api
        .onPost('/api/v2/mobile/pinboards/', createPinboardWithRecentItemsParams)
        .reply(201, createPinboardWithRecentItemsResponse);
      api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
      this.searchPage.setValue('@queryInput', '123');
      this.searchPage.section.officers.section.firstRow.click('@itemTitle');

      this.searchPage.click('@searchBreadcrumb');
      this.searchPage.waitForElementVisible('@queryInput');
      this.searchPage.clearValue('@queryInput');
      // Empty value doesn't trigger change -> Set short query to show recent
      this.searchPage.setValue('@queryInput', '1');

      this.searchPage.expect.element('@recentHeader').to.be.present;
      let recentItems = this.searchPage.section.recent;

      recentItems.section.firstRecentItem.click('@pinButton');
      this.searchPage.section.pinboardIntroduction.waitForElementNotPresent('@content', 1000);

      recentItems.section.firstRecentItem.click('@pinButton');
      this.searchPage.section.pinboardIntroduction.waitForElementVisible('@content', 1000);
    });

    it('should close pinboard introduction after click close', function (client) {
      this.searchPage.section.pinboardIntroduction.waitForElementVisible('@content', 1000);
      this.searchPage.section.pinboardIntroduction.click('@closeButton');
      this.searchPage.section.pinboardIntroduction.waitForElementNotPresent('@content', 1000);
      client.refresh();
      this.searchPage.waitForElementVisible('@body');
      this.searchPage.section.pinboardIntroduction.waitForElementNotPresent('@content', 1000);
    });

    it('should close pinboard introduction and redirect to pinboard page after click Get Started', function () {
      this.searchPage.section.pinboardIntroduction.waitForElementVisible('@content', 1000);
      this.searchPage.section.pinboardIntroduction.click('@getStartedButton');
      this.pinboardPage.waitForElementPresent('@searchBar');
      this.searchPage.navigate();
      this.searchPage.waitForElementPresent('@body');
      this.searchPage.section.pinboardIntroduction.waitForElementNotPresent('@content', 1000);
    });
  });

  context('PinButton introduction', function () {
    beforeEach(function (client, done) {
      api.onGet('/api/v2/search-mobile/?term=intr').reply(200, mockSearchQueryLongResponse);
      api.onGet('/api/v2/search-mobile/?term=2004-04-23+ke').reply(200, mockSearchQueryResponseWithDate);
      api
        .onGet('/api/v2/search-mobile/single/?term=2004-04-23+ke&contentType=OFFICER')
        .reply(200, mockFirstOfficersSearchQueryResponse);
      clearReduxStore(client);
      this.searchPage.waitForElementVisible('@queryInput');
      done();
    });

    context('search result have less than 3 results', function () {
      it('should display PinButtonIntroduction last pinnable search result', function (client) {
        const pinButtonIntroduction = this.searchPage.elements.pinButtonIntroduction;
        this.searchPage.setValue('@queryInput', 'intr');
        const officersRows = this.searchPage.section.officers.section.rows;
        expectResultCount(client, officersRows, 2);
        const crsRows = this.searchPage.section.crs.section.rows;
        expectResultCount(client, crsRows, 2);
        const trrsRows = this.searchPage.section.crs.section.rows;
        expectResultCount(client, trrsRows, 2);
        this.searchPage.section.officers.section.secondRow.waitForElementVisible(
          '@pinButtonIntroduction',
          PINBOARD_INTRODUCTION_DELAY
        );

        client.elements(pinButtonIntroduction.locateStrategy, pinButtonIntroduction.selector, function (result) {
          assert.equal(result.value.length, 1);
        });
      });
    });

    context('search result have more than 3 results', function () {
      it('should display PinButtonIntroduction third search result', function (client) {
        const pinButtonIntroduction = this.searchPage.elements.pinButtonIntroduction;
        this.searchPage.clearValue('@queryInput');
        this.searchPage.setValue('@queryInput', '2004-04-23 ke');
        this.searchPage.section.officers.waitForElementVisible('@allLink');
        this.searchPage.section.officers.click('@allLink');

        const thirdOfficerRow = this.searchPage.section.officers.section.thirdRow;
        thirdOfficerRow.waitForElementVisible('@pinButtonIntroduction');
        client.elements(pinButtonIntroduction.locateStrategy, pinButtonIntroduction.selector, function (result) {
          assert.equal(result.value.length, 1);
        });
      });
    });

    it('should not display PinButtonIntroduction after click on that result item', function (client) {
      this.searchPage.setValue('@queryInput', 'intr');
      const secondOfficerRow = this.searchPage.section.officers.section.secondRow;
      secondOfficerRow.waitForElementVisible('@pinButtonIntroduction');
      secondOfficerRow.click('@itemIndicator');

      this.searchPage.navigate();
      this.searchPage.waitForElementPresent('@queryInput');
      this.searchPage.setValue('@queryInput', 'intr');
      secondOfficerRow.waitForElementVisible('@pinButton');
      client.pause(PINBOARD_INTRODUCTION_DELAY);
      secondOfficerRow.waitForElementNotPresent('@pinButtonIntroduction');
    });

    it('should dismiss PinButtonIntroduction after click on introduction', function (client) {
      this.searchPage.setValue('@queryInput', '123');
      const firstOfficerRow = this.searchPage.section.officers.section.firstRow;
      firstOfficerRow.waitForElementVisible('@pinButtonIntroduction');
      firstOfficerRow.click('@pinButtonIntroduction');
      client.pause(PINBOARD_INTRODUCTION_DELAY);
      client.assert.urlContains('/search/');
      firstOfficerRow.waitForElementNotPresent('@pinButtonIntroduction', 1000);

      this.searchPage.navigate();
      this.searchPage.waitForElementPresent('@queryInput');
      this.searchPage.setValue('@queryInput', '123');
      firstOfficerRow.waitForElementVisible('@pinButton');
      client.pause(PINBOARD_INTRODUCTION_DELAY);
      firstOfficerRow.waitForElementNotPresent('@pinButtonIntroduction', 1000);
    });

    it('should not display PinButtonIntroduction after click current PinButton', function (client) {
      const pinButtonIntroduction = this.searchPage.elements.pinButtonIntroduction;

      this.searchPage.setValue('@queryInput', 'intr');
      const secondOfficerRow = this.searchPage.section.officers.section.secondRow;
      secondOfficerRow.waitForElementVisible('@pinButtonIntroduction');
      secondOfficerRow.click('@pinButton');
      secondOfficerRow.waitForElementNotPresent('@pinButtonIntroduction');
      client.elements(pinButtonIntroduction.locateStrategy, pinButtonIntroduction.selector, function (result) {
        assert.equal(result.value.length, 0);
      });

      this.searchPage.navigate();
      this.searchPage.waitForElementPresent('@queryInput');
      this.searchPage.setValue('@queryInput', 'intr');
      secondOfficerRow.waitForElementVisible('@pinButton');
      client.pause(PINBOARD_INTRODUCTION_DELAY);
      secondOfficerRow.waitForElementNotPresent('@pinButtonIntroduction');
      client.elements(pinButtonIntroduction.locateStrategy, pinButtonIntroduction.selector, function (result) {
        assert.equal(result.value.length, 0);
      });
    });

    it('should not display PinButtonIntroduction after click other PinButton', function (client) {
      const pinButtonIntroduction = this.searchPage.elements.pinButtonIntroduction;

      this.searchPage.setValue('@queryInput', 'intr');
      const firstOfficerRow = this.searchPage.section.officers.section.firstRow;
      const secondOfficerRow = this.searchPage.section.officers.section.secondRow;
      secondOfficerRow.waitForElementVisible('@pinButtonIntroduction');
      firstOfficerRow.click('@pinButton');
      secondOfficerRow.waitForElementNotPresent('@pinButtonIntroduction');
      client.elements(pinButtonIntroduction.locateStrategy, pinButtonIntroduction.selector, function (result) {
        assert.equal(result.value.length, 0);
      });

      this.searchPage.navigate();
      this.searchPage.waitForElementPresent('@queryInput');
      this.searchPage.setValue('@queryInput', 'intr');
      secondOfficerRow.waitForElementVisible('@pinButton');
      client.pause(PINBOARD_INTRODUCTION_DELAY);
      secondOfficerRow.waitForElementNotPresent('@pinButtonIntroduction');
      client.elements(pinButtonIntroduction.locateStrategy, pinButtonIntroduction.selector, function (result) {
        assert.equal(result.value.length, 0);
      });
    });

    it('should display PinButtonIntroduction on recent', function () {
      api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
      api
        .onGet('/api/v2/search-mobile/recent-search-items/?officer_ids[]=8562&crids[]=1002144&trr_ids[]=14487')
        .reply(200, mockNewRecentSearchItemsResponse,);
      api.onGet('/api/v2/mobile/officers/8562/').reply(200, officer8562);
      api.onGet('/api/v2/mobile/cr/1002144/').reply(200, cr1002144);
      api.onGet('/api/v2/mobile/trr/14487/').reply(200, trr14487);
      this.searchPage.setValue('@queryInput', '123');
      this.searchPage.section.officers.section.firstRow.click('@itemTitle');

      this.searchPage.click('@searchBreadcrumb');
      this.searchPage.section.crs.section.firstRow.waitForElementVisible('@itemTitle');
      this.searchPage.section.crs.section.firstRow.click('@itemTitle');

      this.searchPage.click('@searchBreadcrumb');
      this.searchPage.section.trrs.section.firstRow.waitForElementVisible('@itemTitle');
      this.searchPage.section.trrs.section.firstRow.click('@itemTitle');

      this.searchPage.click('@searchBreadcrumb');
      this.searchPage.waitForElementVisible('@queryInput');
      this.searchPage.clearValue('@queryInput');
      // Empty value doesn't trigger change -> Set short query to show recent
      this.searchPage.setValue('@queryInput', '1');

      this.searchPage.expect.element('@recentHeader').to.be.present;
      let recentItems = this.searchPage.section.recent;

      recentItems.section.thirdRecentItem.expect.element('@pinButtonIntroduction').to.be.present.after(
        PINBOARD_INTRODUCTION_DELAY + 500
      );
    });
  });
});
