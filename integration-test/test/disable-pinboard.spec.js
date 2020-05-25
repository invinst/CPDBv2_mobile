'use strict';

var api = require(__dirname + '/../mock-api');
const {
  mockLandingPageCms,
  mockTopOfficersByAllegation,
  mockRecentActivities,
  mockNewDocuments,
  mockComplaintSummaries,
} = require(__dirname + '/../mock-data/main-page');
const { clearReduxStore } = require(__dirname + '/../utils');

const officer2235 = {
  'officer_id': 2235,
  'full_name': 'Kevin Osborn',
  active: true,
  'allegation_count': 104,
  badge: '8548',
  'historic_badges': ['8547', '8546'],
  'birth_year': 1957,
  'civilian_compliment_count': 4,
  'percentile_allegation': 99.895,
  'date_of_appt': '1993-12-13',
  'date_of_resignation': '2017-01-15',
  'discipline_count': 1,
  gender: 'Male',
  'honorable_mention_count': 55,
  'honorable_mention_percentile': 85.87,
  'major_award_count': 1,
  race: 'White',
  rank: 'Police Officer',
  'sustained_count': 1,
  'trr_count': 1,
  unit: {
    'unit_id': 6,
    description: 'District 005',
    'unit_name': '005',
  },
  percentiles: [
    {
      'officer_id': 2235,
      year: 2005,
      'percentile_allegation_civilian': '66.251',
      'percentile_allegation_internal': '0.023',
      'percentile_allegation': '41.001',
    },
    {
      'officer_id': 2235,
      year: 2006,
      'percentile_allegation_civilian': '66.251',
      'percentile_allegation_internal': '0.023',
      'percentile_trr': '44.7',
      'percentile_allegation': '41.001',
    },
    {
      'officer_id': 2235,
      year: 2007,
      'percentile_allegation_civilian': '0.022',
      'percentile_allegation_internal': '75.065',
      'percentile_trr': '0.046',
      'percentile_allegation': '31.201',
    },
  ],
};

const mockTimeline = [
  {
    'unit_name': '007',
    kind: 'AWARD',
    'unit_description': 'District 007',
    rank: 'Detective',
    date: '2006-03-01',
    'award_type': 'Honorable Mention',
  },
  {
    'unit_name': '007',
    kind: 'RANK_CHANGE',
    'unit_description': 'District 007',
    rank: 'Detective',
    date: '2006-02-28',
  },
  {
    'trr_id': 1,
    'unit_name': '007',
    kind: 'FORCE',
    taser: true,
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2005-12-17',
    'firearm_used': false,
  },
  {
    'trr_id': 2,
    'unit_name': '007',
    kind: 'FORCE',
    taser: false,
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2005-03-17',
    'firearm_used': false,
  },
  {
    'unit_name': '007',
    kind: 'UNIT_CHANGE',
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2005-01-07',
  },
  {
    'trr_id': 3,
    'unit_name': '153',
    kind: 'FORCE',
    taser: false,
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2004-12-17',
    'firearm_used': true,
  },
  {
    category: 'Illegal Search',
    'unit_name': '153',
    kind: 'CR',
    subcategory: 'Search Of Premise Without Warrant',
    crid: '294088',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2003-11-26',
    coaccused: 8,
    finding: 'Exonerated',
    outcome: 'No Action Taken',
    attachments: [
      {
        url: 'https://assets.documentcloud.org/documents/3518950/CRID-294088-CR.pdf',
        'preview_image_url': 'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
        title: 'CRID 294088 CR',
        'file_type': 'document',
      },
      {
        url: 'https://player.vimeo.com/video/165206078',
        title: 'Video Clip',
        'file_type': 'video',
      },
      {
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/262463136&amp',
        title: 'Audio Clip',
        'file_type': 'audio',
      },
    ],
  },
  {
    category: 'Criminal Misconduct',
    'unit_name': '153',
    kind: 'CR',
    subcategory: 'Theft',
    crid: '260131',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2003-02-17',
    coaccused: 4,
    finding: 'Sustained',
    outcome: 'No Action Taken',
    attachments: [
      {
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/262463125&amp',
        title: 'Audio Clip',
        'file_type': 'audio',
      },
      {
        url: 'https://player.vimeo.com/video/165213573',
        title: 'Video Clip',
        'file_type': 'video',
      },
      {
        url: 'https://assets.documentcloud.org/documents/3518954/CRID-299780-CR.pdf',
        'preview_image_url': 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
        title: 'CRID 294088 CR',
        'file_type': 'document',
      },
    ],
  },
  {
    'unit_name': '153',
    kind: 'RANK_CHANGE',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2000-04-28',
  },
  {
    'unit_name': '153',
    kind: 'UNIT_CHANGE',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2000-04-28',
  },
  {
    kind: 'JOINED',
    'unit_description': 'Recruit Training Section',
    date: '2000-02-05',
  },
];

const mockCoaccusals = [
  {
    id: 27778,
    'full_name': 'Carl Suchocki',
    rank: 'Police Officer',
    'percentile_trr': '49.1036',
    'percentile_allegation_civilian': '99.2525',
    'percentile_allegation_internal': '79.9133',
    'coaccusal_count': 47,
  },
];

const mockOfficerPageCms = {
  fields: [
    {
      name: 'triangle_description',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff83',
          text: 'The corners of the triangle show the percentile score for this officer ' +
            'in each of three types of data: complaints from civilians, complaints from other officers, ' +
            'and self-reported uses of force.',
          type: 'unstyled',
        }],
      },
    },
    {
      name: 'triangle_sub_description',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff84',
          text: 'If one corner of the black inner triangle is close to reaching the outer triangle, ' +
            'then this officer is named in a relatively high rate ' +
            'of incidents of that type compared with other officers.',
          type: 'unstyled',
        }],
      },
    },
    {
      name: 'scale_description',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff85',
          text: 'If an officer’s percentile rank for civilian complaints is 99% ' +
            'then this means that they were accused in more civilian complaints per year than 99% of other officers.',
          type: 'unstyled',
        }],
      },
    },
    {
      name: 'scale_sub_description',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff82',
          text: 'Civilian and internal complaint percentiles are based on data that is only available since 2000, ' +
            'use of force data is only available since 2004. ' +
            'The overall allegation count percentiles displayed on the officer profile page ' +
            'are calculated using data that reaches back to 1988.',
          type: 'unstyled',
        }],
      },
    },
    {
      name: 'no_data_explain_text',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff86',
          text: 'There is not enough data to construct a radar graph for this officer.',
          type: 'unstyled',
        }],
      },
    },
  ],
};

const mockComplaint = {
  'most_common_category': {
    'category': 'Operation/Personnel Violations',
    'allegation_name': 'Inventory Procedures',
  },
  'summary': 'summary',
  'incident_date': '2012-04-30',
  'involvements': [
    {
      'involved_type': 'investigator',
      'full_name': 'Peter Parker',
      'officer_id': 1,
    },
    {
      'involved_type': 'investigator',
      'full_name': 'Edward May',
      'officer_id': null,
    },
    {
      'involved_type': 'police_witness',
      'full_name': 'Patrick Boyle',
      'officer_id': 123,
    },
  ],
  'complainants': [
    {
      'gender': 'Male',
      'age': 57,
      'race': 'White',
    },
  ],
  'victims': [
    {
      'gender': 'Male',
      'age': 45,
      'race': 'Black',
    },
  ],
  'crid': '1053667',
  'point': {
    'lat': 41.846749,
    'lon': -87.685141,
  },
  'beat': '1034',
  'coaccused': [
    {
      'category': 'Excessive Force',
      'final_outcome': 'Unknown',
      'id': 6493,
      'final_finding': 'Sustained',
      'rank': 'Police Officer',
      'full_name': 'Donovan Markiewicz',
      'allegation_count': 10,
    },
    {
      'category': 'Excessive Force',
      'final_outcome': 'Unknown',
      'id': 234,
      'final_finding': 'Sustained',
      'rank': 'Police Officer',
      'full_name': 'John Foertsch',
      'allegation_count': 8,
    },
    {
      'category': 'Excessive Force',
      'final_outcome': 'Unknown',
      'id': 543,
      'final_finding': 'Sustained',
      'rank': 'Police Officer',
      'full_name': 'Kenneth Wojtan',
      'allegation_count': 5,
    },
  ],
  'location': 'Building',
  'address': '2459 WESTERN AVE, CHICAGO IL 60608',
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

describe('Disable pinboard feature', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/cms-pages/landing-page/', 200, mockLandingPageCms);

    client.page.main().navigate();
    client.execute(
      function () {
        return localStorage.setItem('PINBOARD_ENABLED', false);
      }
    );
    client.waitForElementVisible('body');
    done();
  });

  afterEach(function (client, done) {
    api.cleanMock();
    client.execute(
      function () {
        return localStorage.removeItem('PINBOARD_ENABLED');
      }
    );
    done();
  });


  it('should redirect to landing page if users go to pinboard page via url', function (client) {
    client.url('/pinboard/77edc128/untitled-pinboard/');
    client.page.main().expect.element('@searchLink').to.be.visible;
    client.assert.urlEquals('http://localhost:9001/');
  });

  it('should open landing page if accessing a pinboard network map expanded mode via URL', function (client) {
    const mainPage = client.page.main();
    const mainPageUrl = mainPage.url();

    client.url('/social-graph/pinboard/5cd06f2b/');
    client.pause(200);

    mainPage.expect.element('@title').text.to.contain('Citizens Police Data Project').before(500);
    client.assert.urlEquals(mainPageUrl);
  });

  it('should open landing page if accessing a pinboard geographic expanded mode via URL', function (client) {
    const mainPage = client.page.main();
    const mainPageUrl = mainPage.url();

    client.url('/geographic/pinboard/5cd06f2b/');
    client.pause(200);

    mainPage.expect.element('@title').text.to.contain('Citizens Police Data Project').before(500);
    client.assert.urlEquals(mainPageUrl);
  });

  describe('Landing page', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false', 200, {});
      api.mock('GET', '/api/v2/officers/top-by-allegation/', 200, mockTopOfficersByAllegation);
      api.mock('GET', '/api/v2/activity-grid/', 200, mockRecentActivities);
      api.mock('GET', '/api/v2/cr/list-by-new-document/', 200, mockNewDocuments);
      api.mock('GET', '/api/v2/cr/complaint-summaries/', 200, mockComplaintSummaries);

      this.mainPage = client.page.main();
      this.mainPage.navigate();
      done();
    });

    it('should not display pinned buttons', function () {
      const recentActivitiesCards = this.mainPage.section.recentActivities.section.cards;
      const topOfficersByAllegationCards = this.mainPage.section.topOfficersByAllegation.section.cards;
      const complaintSummariesCards = this.mainPage.section.complaintSummaries.section.cards;
      const newDocumentAllegationsCards = this.mainPage.section.newDocumentAllegations.section.cards;

      recentActivitiesCards.waitForElementVisible('@firstCard');
      recentActivitiesCards.expect.element('@pinButton').to.not.be.visible;

      topOfficersByAllegationCards.waitForElementVisible('@firstCard');
      topOfficersByAllegationCards.expect.element('@pinButton').to.not.be.visible;

      complaintSummariesCards.waitForElementVisible('@firstCard');
      complaintSummariesCards.expect.element('@pinButton').to.not.be.visible;

      newDocumentAllegationsCards.waitForElementVisible('@firstCard');
      newDocumentAllegationsCards.expect.element('@pinButton').to.not.be.visible;
    });

    it('should not display pinboard button introduction', function (client) {
      clearReduxStore(client);
      this.mainPage.waitForElementVisible('@searchLink');
      this.mainPage.section.pinboardButtonIntroduction.expect.element('@introductionContent').to.not.be.present;
    });
  });

  describe('Search page', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/search-mobile/?term=123', 200, mockSearchQueryResponseForRecentItems);
      api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false', 200, {});
      api.mock('GET', '/api/v2/search-mobile/?term=2004-04-23+ke', 200, mockSearchQueryResponseWithDate);
      api.mock('GET', '/api/v2/search-mobile/?term=Kelvin', 200, mockInvestigatorCRSearchResponse);
      api.mock(
        'GET', '/api/v2/search-mobile/recent-search-items/?officer_ids[]=8562&crids[]=1002144&trr_ids[]=14487',
        200,
        mockNewRecentSearchItemsResponse,
      );
      api.mock('GET', '/api/v2/mobile/officers/8562/', 200, officer8562);
      api.mock('GET', '/api/v2/mobile/cr/1002144/', 200, cr1002144);
      api.mock('GET', '/api/v2/mobile/trr/14487/', 200, trr14487);

      this.searchPage = client.page.search();
      this.searchPage.navigate(this.searchPage.url());
      this.searchPage.waitForElementVisible('@closeButton');
      done();
    });

    it('should not display pinboard bar', function () {
      this.searchPage.expect.element('@pinboardBar').to.not.be.active;
    });

    it('should not display pinned button on search results', function () {
      this.searchPage.setValue('@queryInput', '123');
      this.searchPage.section.officers.section.firstRow.waitForElementVisible('@itemTitle');
      this.searchPage.section.officers.section.firstRow.expect.element('@pinButton').to.not.be.visible;
      this.searchPage.section.crs.section.firstRow.waitForElementVisible('@itemTitle');
      this.searchPage.section.crs.section.firstRow.expect.element('@pinButton').to.not.be.visible;
      this.searchPage.section.trrs.section.firstRow.waitForElementVisible('@itemTitle');
      this.searchPage.section.trrs.section.firstRow.expect.element('@pinButton').to.not.be.visible;

      this.searchPage.clearValue('@queryInput');
      this.searchPage.setValue('@queryInput', '2004-04-23 ke');
      this.searchPage.section.dateOfficers.section.firstRow.waitForElementVisible('@itemTitle');
      this.searchPage.section.dateOfficers.section.firstRow.expect.element('@pinButton').to.not.be.visible;
      this.searchPage.section.dateCRs.section.firstRow.waitForElementVisible('@itemTitle');
      this.searchPage.section.dateCRs.section.firstRow.expect.element('@pinButton').to.not.be.visible;
      this.searchPage.section.dateTRRs.section.firstRow.waitForElementVisible('@itemTitle');
      this.searchPage.section.dateTRRs.section.firstRow.expect.element('@pinButton').to.not.be.visible;

      this.searchPage.clearValue('@queryInput');
      this.searchPage.setValue('@queryInput', 'Kelvin');
      this.searchPage.section.investigatorCRs.section.firstRow.waitForElementVisible('@itemTitle');
      this.searchPage.section.investigatorCRs.section.firstRow.expect.element('@pinButton').to.not.be.visible;
    });

    it('should not display pinned buttons on recent search items', function () {
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

      recentItems.section.firstRecentItem.expect.element('@pinButton').to.not.be.visible;
      recentItems.section.secondRecentItem.expect.element('@pinButton').to.not.be.visible;
      recentItems.section.thirdRecentItem.expect.element('@pinButton').to.not.be.visible;
    });

    it('should not display pinboard introduction', function (client) {
      clearReduxStore(client);
      this.searchPage.waitForElementVisible('@queryInput');
      this.searchPage.section.pinboardIntroduction.expect.element('@content').to.not.be.present;
    });

    it('should not display PinButton introduction', function (client) {
      clearReduxStore(client);
      this.searchPage.waitForElementVisible('@queryInput');
      this.searchPage.setValue('@queryInput', '123');
      const firstOfficerRow = this.searchPage.section.officers.section.firstRow;
      firstOfficerRow.waitForElementVisible('@itemTitle');
      firstOfficerRow.expect.element('@pinButtonIntroduction').to.not.be.present;
    });
  });

  describe('Officer page', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/cms-pages/officer-page/', 200, mockOfficerPageCms);
      api.mock('GET', '/api/v2/mobile/officers/2235/', 200, officer2235);
      api.mock('GET', '/api/v2/mobile/officers/2235/new-timeline-items/', 200, mockTimeline);
      api.mock('GET', '/api/v2/mobile/officers/2235/coaccusals/', 200, mockCoaccusals);

      this.officerPage = client.page.officerPage();
      this.officerPage.navigate(this.officerPage.url(2235));
      done();
    });

    it('should not show pinned button on header', function () {
      this.officerPage.waitForElementPresent('@pinButton');
      this.officerPage.expect.element('@pinButton').to.not.be.visible;
    });

    it('should not show pinned button on coaccusals cards', function () {
      this.officerPage.waitForElementVisible('@coaccusalsTabButton');
      this.officerPage.click('@coaccusalsTabButton');
      this.officerPage.section.coaccusals.waitForElementVisible('@firstCoaccusalCard');
      this.officerPage.section.coaccusals.expect.element('@firstPinButton').to.not.be.visible;
    });
  });

  describe('CR page', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/mobile/cr/1053667/', 200, mockComplaint);

      this.complaintPage = client.page.complaintPage();
      this.complaintPage.navigate(this.complaintPage.url('1053667'));
      done();
    });

    it('should not show pinned button on header', function () {
      this.complaintPage.waitForElementPresent('@pinButton');
      this.complaintPage.expect.element('@pinButton').to.not.be.visible;
    });

    it('should not show pinned button on accused officer cards', function () {
      this.complaintPage.section.firstCoaccusal.waitForElementVisible('@name');
      this.complaintPage.section.firstCoaccusal.expect.element('@pinButton').to.not.be.visible;
    });
  });
});
