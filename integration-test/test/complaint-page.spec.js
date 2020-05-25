'use strict';

const api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');
const { mockToasts } = require(__dirname + '/../mock-data/toasts');
const { mockGetAppConfig } = require(__dirname + '/../mock-data/app-config');
const {
  pinboards,
  updatedPinboards,
  updateRequestParams,
  createdPinboards,
  createPinboardRequestParams,
  createdPinboardsComplaintsData,
} = require(__dirname + '/../mock-data/pinboard-page').pinboardsMenu;


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
      'percentile_allegation': 96.9967,
      'percentile_trr': 67.9112,
      'percentile_allegation_civilian': 99.9817,
      'percentile_allegation_internal': 87.8280,
      'officer_id': 123,
    },
    {
      'involved_type': 'police_witness',
      'full_name': 'Corey Flagg',
      'percentile_trr': 12.5612,
      'percentile_allegation': 73.2128,
      'percentile_allegation_civilian': 99.9696,
      'percentile_allegation_internal': 99.6468,
      'officer_id': 8658,
    },
    {
      'involved_type': 'police_witness',
      'full_name': 'Charles Toussas',
      'percentile_trr': 15.3123,
      'percentile_allegation': 59.7657,
      'percentile_allegation_civilian': 99.9696,
      'percentile_allegation_internal': 99.6468,
      'officer_id': 1782,
    },
    {
      'involved_type': 'police_witness',
      'full_name': 'Kevin Osborn',
      'percentile_trr': 85.2355,
      'percentile_allegation': 33.2812,
      'percentile_allegation_internal': 99.6468,
      'percentile_allegation_civilian': 99.9696,
      'officer_id': 2859,
    },
    {
      'involved_type': 'police_witness',
      'full_name': 'Joe Parker',
      'percentile_trr': 54.12342,
      'percentile_allegation': 12.9273,
      'percentile_allegation_civilian': 99.9696,
      'percentile_allegation_internal': 99.6468,
      'officer_id': 8638,
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
      'percentile_trr': 85.2355,
      'percentile_allegation': 33.2812,
      'percentile_allegation_internal': 99.6468,
      'percentile_allegation_civilian': 99.9696,
    },
    {
      'category': 'Excessive Force',
      'final_outcome': 'Unknown',
      'id': 234,
      'final_finding': 'Sustained',
      'rank': 'Police Officer',
      'full_name': 'John Foertsch',
      'allegation_count': 8,
      'percentile_trr': 65.2355,
      'percentile_allegation': 13.2812,
      'percentile_allegation_internal': 69.6468,
      'percentile_allegation_civilian': 59.9696,
    },
    {
      'category': 'Excessive Force',
      'final_outcome': 'Unknown',
      'id': 543,
      'final_finding': 'Sustained',
      'rank': 'Police Officer',
      'full_name': 'Kenneth Wojtan',
      'allegation_count': 5,
      'percentile_trr': 35.2355,
      'percentile_allegation': 33.2812,
      'percentile_allegation_internal': 29.6468,
      'percentile_allegation_civilian': 39.9696,
    },
  ],
  'location': 'Building',
  'address': '2459 WESTERN AVE, CHICAGO IL 60608',
};

describe('ComplaintPageTest', function () {
  beforeEach(function (client, done) {
    api.cleanMock();
    api.mock('GET', '/api/v2/mobile/cr/1053667/', 200, mockComplaint);
    api.mock('GET', '/api/v2/mobile/toast/', 200, mockToasts);
    api.mock('GET', '/api/v2/app-config/', 200, mockGetAppConfig);
    api.mockPost(
      '/api/v2/mobile/cr/1053667/request-document/',
      200,
      { email: 'valid@email.com' },
      { 'message': 'Thanks for subscribing.', crid: 1053667 }
    );
    api.mockPost(
      '/api/v2/mobile/cr/1053667/request-document/',
      400,
      { email: 'invalid#email.com' },
      { 'message': 'Sorry, we can not subscribe your email' }
    );
    this.complaintPage = client.page.complaintPage();
    done();
  });

  context('complaint page content', function () {
    beforeEach(function (client, done) {
      this.complaintPage.navigate(this.complaintPage.url('1053667'));
      this.complaintPage.expect.element('@body').to.be.present;
      done();
    });

    it('should show proper header with CR title', function (client) {
      const comlaintCategory = this.complaintPage.section.complaintCategory;
      comlaintCategory.waitForElementVisible('@category', TIMEOUT);
      comlaintCategory.expect.element('@category').text.to.contain('Operation/Personnel Violations');
      comlaintCategory.expect.element('@subcategory').text.to.contain('Inventory Procedures');
    });

    it('should show proper coaccusals', function (client) {
      const coaccusals = this.complaintPage.section.coaccusals;
      coaccusals.expect.element('@header').text.to.contain('3 ACCUSED OFFICERS');
      coaccusals.expect.element('@showAll').to.be.visible;
      coaccusals.expect.element('@paddingBottom').not.to.be.present;
      coaccusals.expect.element('@firstRadarChart').to.have.css('background-color')
        .which.equal('rgba(244, 162, 152, 1)');

      coaccusals.click('@showAll');
      coaccusals.expect.element('@showAll').not.to.be.present;
      coaccusals.expect.element('@paddingBottom').to.be.visible;

      const firstCoaccusal = this.complaintPage.section.firstCoaccusal;
      firstCoaccusal.expect.element('@rank').text.to.contain('Police Officer');
      firstCoaccusal.expect.element('@name').text.to.contain('Donovan Markiewicz');
      firstCoaccusal.expect.element('@category').text.to.contain('Excessive Force');
      firstCoaccusal.expect.element('@findingOutcome').text.to.contain('Sustained');
    });

    it('should show proper cr info', function () {
      this.complaintPage.expect.element('@victims').text.to.contain('Black, Male, Age 45');
      this.complaintPage.expect.element('@complainants').text.to.contain('White, Male, Age 57');
      this.complaintPage.expect.element('@summary').text.to.contain('summary');
      this.complaintPage.expect.element('@investigatorTimeline').text.to.contain(
        'Apr 30, 2012\nIncident Occurs\nInvestigation Begins\nInvestigation Closed'
      );
      this.complaintPage.expect.element('@firstInvestigator').text.to.contain('Peter Parker');
      this.complaintPage.expect.element('@incidentDate').text.to.equal('APR 30, 2012');
    });

    it('should go to officer page when click on investigator which is an officer', function (client) {
      this.complaintPage.click('@firstInvestigator');
      client.assert.urlContains('/officer/1/peter-parker');
    });

    it('should show proper investigator which is an officer', function (client) {
      const policeWitnessSection = this.complaintPage.section.policeWitnesses;
      policeWitnessSection.expect.element('@firstRadarChart').to.have.css('background-color')
        .which.equal('rgba(245, 37, 36, 1)');
      policeWitnessSection.expect.element('@secondRadarChart').to.have.css('background-color')
        .which.equal('rgba(255, 65, 44, 1)');
      policeWitnessSection.expect.element('@thirdRadarChart').to.have.css('background-color')
        .which.equal('rgba(255, 100, 83, 1)');
      policeWitnessSection.expect.element('@forthRadarChart').to.have.css('background-color')
        .which.equal('rgba(244, 162, 152, 1)');
      policeWitnessSection.expect.element('@fifthRadarChart').to.have.css('background-color')
        .which.equal('rgba(249, 211, 195, 1)');
    });

    it('should go to search page when click on investigator which is not an officer', function (client) {
      this.complaintPage.click('@secondInvestigator');
      client.assert.urlContains('/search/?terms=Edward%20May');
    });

    it('should show proper cr location', function () {
      const location = this.complaintPage.section.location;
      location.expect.element('@address').text.to.contain('2459 WESTERN AVE, CHICAGO IL 60608');
      location.expect.element('@type').text.to.contain('Building');
      location.expect.element('@beat').text.to.contain('1034');
    });

    it('should show request document modal when clicks on "Request Document"', function () {
      this.complaintPage.expect.section('@requestDocumentForm').to.be.not.present;

      this.complaintPage.click('@requestDocumentButton');
      this.complaintPage.expect.section('@requestDocumentForm').to.be.present;

      this.complaintPage.section.requestDocumentForm.click('@cancelButton');
      this.complaintPage.expect.section('@requestDocumentForm').to.be.not.present;
    });

    it('should accept valid email, and close modal after 1.5s', function () {
      this.complaintPage.expect.element('@requestDocumentButton').text.to.equal('Request Documents');
      this.complaintPage.click('@requestDocumentButton');
      this.complaintPage.expect.section('@requestDocumentForm').to.be.present;

      const requestDocumentForm = this.complaintPage.section.requestDocumentForm;
      requestDocumentForm.setValue('@emailInput', 'valid@email.com');
      requestDocumentForm.click('@requestButton');
      requestDocumentForm.waitForElementVisible('@messageBox', TIMEOUT);
      requestDocumentForm.expect.element('@messageBox').text.to.equal('Thanks for subscribing.');

      this.complaintPage.expect.section('@requestDocumentForm').to.be.not.present.after(2000);
      this.complaintPage.expect.element('@requestDocumentButton').text.to.equal('Documents Requested✔');
    });

    it('should ignore invalid email', function () {
      this.complaintPage.click('@requestDocumentButton');
      this.complaintPage.expect.section('@requestDocumentForm').to.be.present;

      const requestDocumentForm = this.complaintPage.section.requestDocumentForm;
      requestDocumentForm.setValue('@emailInput', 'invalid#email.com');
      requestDocumentForm.click('@requestButton');
      requestDocumentForm.waitForElementVisible('@messageBox', TIMEOUT);
      requestDocumentForm.expect.element('@messageBox').text.to.equal(
        'Sorry, we can not subscribe your email'
      );
    });

    it('should have clicky installed', function (client) {
      const page = client.page.common();
      page.waitForElementPresent('@clickyScript');
      page.waitForElementPresent('@clickySiteIdsScript');
      page.waitForElementPresent('@clickyNoJavascriptGIF');
    });
  });

  describe('Pinboard function', function () {
    beforeEach(function (client, done) {
      this.main = client.page.main();
      this.search = client.page.search();
      done();
    });

    it('should display toast when pinning a coaccusal', function (client) {
      api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false', 200, {});

      api.mockPut(
        '/api/v2/mobile/pinboards/5cd06f2b/',
        200,
        {
          'officer_ids': [],
          crids: [],
          'trr_ids': [],
          title: '',
          description: '',
        },
        {
          id: '5cd06f2b',
          'officer_ids': [],
          crids: [],
          'trr_ids': [],
          title: '',
          description: '',
        },
      );

      api.mockPost(
        '/api/v2/mobile/pinboards/',
        201,
        {
          'officer_ids': [6493],
          crids: [],
          'trr_ids': [],
        },
        {
          id: '5cd06f2b',
          'officer_ids': [6493],
          crids: [],
          'trr_ids': [],
          title: '',
          description: '',
        },
      );

      this.complaintPage.navigate(this.complaintPage.url('1053667'));
      this.complaintPage.waitForElementVisible('@body');

      this.complaintPage.section.firstCoaccusal.click('@pinButton');
      this.complaintPage.waitForElementVisible('@lastToast');
      this.complaintPage.expect.element('@lastToast').text.to.equal(
        'Donovan Markiewicz added to pinboard\nGo to pinboard'
      ).before(TIMEOUT);

      this.complaintPage.click('@landingPageBreadCrumb');
      this.main.waitForElementVisible('@searchLink');
      this.main.click('@searchLink');
      this.search.expect.element('@pinboardBar').text.to.equal('Pinboard (1)').before(TIMEOUT);
      client.back();
      client.back();

      this.complaintPage.section.firstCoaccusal.click('@pinButton');
      this.complaintPage.waitForElementVisible('@lastToast');
      this.complaintPage.expect.element('@lastToast').text.to.equal(
        'Donovan Markiewicz removed from pinboard\nGo to pinboard'
      ).before(TIMEOUT);

      this.complaintPage.click('@landingPageBreadCrumb');
      this.main.waitForElementVisible('@searchLink');
      this.main.click('@searchLink');
      this.search.waitForElementPresent('@queryInput');
      this.search.waitForElementNotVisible('@pinboardBar', TIMEOUT);
    });

    context('current complaint', function () {
      beforeEach(function (client, done) {
        api.mock('GET', '/api/v2/mobile/pinboards/8d2daffe/', 200, pinboards[0]);
        api.mock('GET', '/api/v2/mobile/pinboards/8d2daffe/complaints/', 200, []);
        api.mock('GET', '/api/v2/mobile/pinboards/8d2daffe/officers/', 200, []);
        api.mock('GET', '/api/v2/mobile/pinboards/8d2daffe/trrs/', 200, []);
        done();
      });

      context('when user has one active pinboard', function () {
        beforeEach(function (client, done) {
          api.mock('GET', '/api/v2/mobile/pinboards/?detail=true', 200, [pinboards[0]]);
          api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false', 200, pinboards[0]);
          api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false', 200, pinboards[0]);
          api.mockPut('/api/v2/mobile/pinboards/8d2daffe/', 200, updateRequestParams[1], updatedPinboards[1]);
          this.complaintPage.navigate(this.complaintPage.url('1053667'));
          this.complaintPage.expect.element('@body').to.be.present;
          done();
        });

        it('should display toast when pinning', function (client) {
          this.complaintPage.click('@pinButton');
          this.complaintPage.waitForElementVisible('@lastToast');
          this.complaintPage.expect.element('@lastToast').text.to.equal(
            'CR #1053667 added to pinboard\nGo to pinboard'
          );

          this.complaintPage.click('@landingPageBreadCrumb');
          this.main.waitForElementVisible('@searchLink');
          this.main.click('@searchLink');
          this.search.waitForElementVisible('@pinboardBar');
          this.search.expect.element('@pinboardBar').text.to.equal('Pinboard (4)');
        });

        it('should display toast when unpinning', function (client) {
          this.complaintPage.click('@pinButton');
          this.complaintPage.waitForElementVisible('@lastToast');
          this.complaintPage.expect.element('@lastToast').text.to.equal(
            'CR #1053667 added to pinboard\nGo to pinboard'
          );

          this.complaintPage.click('@pinButton');
          this.complaintPage.waitForElementVisible('@lastToast');
          this.complaintPage.expect.element('@lastToast').text.to.equal(
            'CR #1053667 removed from pinboard\nGo to pinboard'
          );

          this.complaintPage.click('@landingPageBreadCrumb');
          this.main.waitForElementVisible('@searchLink');
          this.main.click('@searchLink');
          this.search.waitForElementVisible('@pinboardBar');
          this.search.expect.element('@pinboardBar').text.to.equal('Pinboard (3)');
        });
      });

      context('when user has more than 1 pinboard', function () {
        beforeEach(function (client, done) {
          api.mock('GET', '/api/v2/mobile/pinboards/?detail=true', 200, pinboards);
          api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false', 200, {});
          api.mock('GET', '/api/v2/mobile/pinboards/f7231a74/', 200, createdPinboards[0]);
          api.mock('GET', '/api/v2/mobile/pinboards/f7231a74/complaints/', 200, createdPinboardsComplaintsData);
          api.mock('GET', '/api/v2/mobile/pinboards/f7231a74/officers/', 200, []);
          api.mock('GET', '/api/v2/mobile/pinboards/f7231a74/trrs/', 200, []);
          api.mockPut('/api/v2/mobile/pinboards/8d2daffe/', 200, updateRequestParams[1], updatedPinboards[1]);
          api.mockPost(
            '/api/v2/mobile/pinboards/',
            200,
            createPinboardRequestParams[1],
            createdPinboards[1],
          );
          this.complaintPage = client.page.complaintPage();
          this.main = client.page.main();
          this.search = client.page.search();
          this.pinboardPage = client.page.pinboardPage();
          this.complaintPage.navigate(this.complaintPage.url('1053667'));
          this.complaintPage.expect.element('@body').to.be.present;
          done();
        });

        it('should display pinboards menu', function (client) {
          const pinboardsMenu = this.complaintPage.section.pinboardsMenu;
          const pinboardsMenuItems = pinboardsMenu.elements.items;

          this.complaintPage.click('@addToPinboardButton');
          pinboardsMenu.waitForElementVisible('@firstItemTitle');

          client.elements(pinboardsMenuItems.locateStrategy, pinboardsMenuItems.selector, function (menuItems) {
            client.assert.equal(menuItems.value.length, 5);
          });
          pinboardsMenu.expect.element('@firstItemTitle').text.to.equal('Skrull Cap');
          pinboardsMenu.expect.element('@firstItemCreatedAt').text.to.equal('Created Mar 09, 2020');
          pinboardsMenu.expect.element('@secondItemTitle').text.to.equal('Watts Crew');
          pinboardsMenu.expect.element('@secondItemCreatedAt').text.to.equal('Created Mar 09, 2020');
          pinboardsMenu.expect.element('@thirdItemTitle').text.to.equal('');
          pinboardsMenu.expect.element('@thirdItemCreatedAt').text.to.equal('Created Mar 09, 2020');
        });

        it('should close pinboards menu when click outside', function () {
          const pinboardsMenu = this.complaintPage.section.pinboardsMenu;

          this.complaintPage.click('@addToPinboardButton');
          pinboardsMenu.waitForElementVisible('@firstItemTitle');
          this.complaintPage.click('@summary');
          pinboardsMenu.waitForElementNotPresent('@firstItemTitle');
        });

        it('should display toast and close pinboards menu when pinning', function (client) {
          const pinboardsMenu = this.complaintPage.section.pinboardsMenu;

          this.complaintPage.click('@addToPinboardButton');
          pinboardsMenu.waitForElementVisible('@firstItemTitle');

          pinboardsMenu.click('@firstItemPinButton');
          this.complaintPage.waitForElementVisible('@lastToast');
          this.complaintPage.expect.element('@lastToast').text.to.equal(
            'CR #1053667 added to pinboard\nGo to pinboard'
          );
          pinboardsMenu.waitForElementNotPresent('@firstItemTitle');

          this.complaintPage.click('@landingPageBreadCrumb');
          this.main.waitForElementVisible('@searchLink');
          this.main.click('@searchLink');
          this.search.waitForElementVisible('@pinboardBar');
          this.search.expect.element('@pinboardBar').text.to.equal('Pinboard (4)');
        });

        it('should display toast when unpinning', function (client) {
          const pinboardsMenu = this.complaintPage.section.pinboardsMenu;

          this.complaintPage.click('@addToPinboardButton');
          pinboardsMenu.waitForElementVisible('@firstItemTitle');

          pinboardsMenu.click('@firstItemPinButton');
          this.complaintPage.waitForElementVisible('@lastToast');
          this.complaintPage.expect.element('@lastToast').text.to.equal(
            'CR #1053667 added to pinboard\nGo to pinboard'
          );
          pinboardsMenu.waitForElementNotPresent('@firstItemTitle');


          this.complaintPage.click('@addToPinboardButton');
          pinboardsMenu.waitForElementVisible('@firstItemTitle');
          pinboardsMenu.click('@firstItemPinButton');
          this.complaintPage.waitForElementVisible('@lastToast');
          this.complaintPage.expect.element('@lastToast').text.to.equal(
            'CR #1053667 removed from pinboard\nGo to pinboard'
          );
          pinboardsMenu.waitForElementNotPresent('@firstItemTitle');

          this.complaintPage.click('@landingPageBreadCrumb');
          this.main.waitForElementVisible('@searchLink');
          this.main.click('@searchLink');
          this.search.waitForElementVisible('@pinboardBar');
          this.search.expect.element('@pinboardBar').text.to.equal('Pinboard (3)');
        });

        it('should create new pinboard with current complaint', function (client) {
          const pinboardsMenu = this.complaintPage.section.pinboardsMenu;

          this.complaintPage.click('@addToPinboardButton');
          pinboardsMenu.waitForElementVisible('@createPinboardWithSelectionButton');
          pinboardsMenu.click('@createPinboardWithSelectionButton');

          this.pinboardPage.waitForElementVisible('@socialGraph');
          client.assert.urlContains('/pinboard/f7231a74/untitled-pinboard/');

          const crsPinnedSection = this.pinboardPage.section.pinnedSection.section.crs;
          const crCards = crsPinnedSection.section.card;
          client.elements(crCards.locateStrategy, crCards.selector, function (cards) {
            client.assert.equal(cards.value.length, 1);
          });
          crsPinnedSection.section.firstCard.expect.element('@firstCardCategory').text.to.equal(
            'Operation/Personnel Violations'
          );
        });
      });
    });
  });
});
