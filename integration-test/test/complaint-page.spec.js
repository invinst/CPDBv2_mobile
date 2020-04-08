'use strict';

const api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');
const { mockToasts } = require(__dirname + '/../mock-data/toasts');

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

describe('ComplaintPageTest', function () {
  beforeEach(function (client, done) {
    api.cleanMock();
    api.mock('GET', '/api/v2/mobile/cr/1053667/', 200, mockComplaint);
    api.mock('GET', '/api/v2/mobile/toast/', 200, mockToasts);
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

  describe('Pinboard function', function () {
    beforeEach(function (client, done) {
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

      this.main = client.page.main();
      this.search = client.page.search();
      done();
    });

    it('should display toast when pinning a coaccusal', function (client) {
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
      this.search.waitForElementNotPresent('@pinboardBar', TIMEOUT);
    });

    it('should display toast when pinning current complaint', function (client) {
      api.mockPost(
        '/api/v2/mobile/pinboards/',
        201,
        {
          'officer_ids': [],
          crids: ['1053667'],
          'trr_ids': [],
        },
        {
          id: '5cd06f2b',
          'officer_ids': [],
          crids: ['1053667'],
          'trr_ids': [],
          title: '',
          description: '',
        },
      );

      this.complaintPage.click('@pinButton');
      this.complaintPage.expect.element('@lastToast').text.to.equal(
        'CR #1053667 added to pinboard\nGo to pinboard'
      ).before(TIMEOUT);

      this.complaintPage.click('@landingPageBreadCrumb');
      this.main.waitForElementVisible('@searchLink');
      this.main.click('@searchLink');
      this.search.expect.element('@pinboardBar').text.to.equal('Pinboard (1)').before(TIMEOUT);
      client.back();
      client.back();

      this.complaintPage.click('@pinButton');
      this.complaintPage.waitForElementVisible('@lastToast');
      this.complaintPage.expect.element('@lastToast').text.to.equal(
        'CR #1053667 removed from pinboard\nGo to pinboard'
      ).before(TIMEOUT);

      this.complaintPage.click('@landingPageBreadCrumb');
      this.main.waitForElementVisible('@searchLink');
      this.main.click('@searchLink');
      this.search.waitForElementPresent('@queryInput');
      this.search.waitForElementNotPresent('@pinboardBar');
    });
  });

  it('should have clicky installed', function (client) {
    const page = client.page.common();
    page.waitForElementPresent('@clickyScript');
    page.waitForElementPresent('@clickySiteIdsScript');
    page.waitForElementPresent('@clickyNoJavascriptGIF');
  });
});
