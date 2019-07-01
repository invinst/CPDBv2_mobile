'use strict';

var _ = require('lodash');
var assert = require('assert');
var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');

var mockData = require(__dirname + '/../mock-data/pinboard-page');

describe('Pinboard Page', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/mobile/officers/123/', 200, mockData.officer123);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/', 200, mockData.pinboardData);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/complaints/', 200, mockData.pinboardCRsData);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/officers/', 200, mockData.pinboardOfficersData);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/trrs/', 200, mockData.pinboardTRRsData);
    api.mock('GET', '/api/v2/mobile/social-graph/network/?pinboard_id=5cd06f2b', 200, mockData.socialGraphData);
    api.mock('GET', '/api/v2/mobile/social-graph/geographic/?pinboard_id=5cd06f2b', 200, mockData.geographicData);

    api.mock('GET', mockData.baseRelevantDocumentsUrl, 200, mockData.firstRelevantDocumentsResponse);
    api.mock(
      'GET', `${mockData.baseRelevantDocumentsUrl}limit=4&offset=4`, 200, mockData.secondRelevantDocumentsResponse
    );
    api.mock(
      'GET', `${mockData.baseRelevantDocumentsUrl}limit=4&offset=8`, 200, mockData.lastRelevantDocumentsResponse
    );

    api.mock('GET', mockData.baseRelevantCoaccusalsUrl, 200, mockData.firstRelevantCoaccusalsResponse);
    api.mock(
      'GET', `${mockData.baseRelevantCoaccusalsUrl}limit=4&offset=4`, 200, mockData.secondRelevantCoaccusalsResponse
    );
    api.mock(
      'GET', `${mockData.baseRelevantCoaccusalsUrl}limit=4&offset=8`, 200, mockData.lastRelevantCoaccusalsResponse
    );

    api.mock('GET', mockData.baseRelevantComplaintsUrl, 200, mockData.firstRelevantComplaintsResponse);
    api.mock(
      'GET', `${mockData.baseRelevantComplaintsUrl}limit=4&offset=4`, 200, mockData.secondRelevantComplaintsResponse
    );
    api.mock(
      'GET', `${mockData.baseRelevantComplaintsUrl}limit=4&offset=8`, 200, mockData.lastRelevantComplaintsResponse
    );

    api.mockPut(
      '/api/v2/mobile/pinboards/5cd06f2b/', 200,
      mockData.updatePinboardTitleParams,
      mockData.updatedPinboardTitle
    );
    api.mockPut(
      '/api/v2/mobile/pinboards/5cd06f2b/', 200,
      mockData.updatePinboardDescriptionParams,
      mockData.updatedPinboardDescription
    );

    this.pinboardPage = client.page.pinboardPage();
    this.pinboardPage.navigate(this.pinboardPage.url('5cd06f2b'));
    client.waitForElementVisible('body', TIMEOUT);
    done();
  });

  afterEach(function (client, done) {
    api.cleanMock();
    done();
  });

  it('should go to search page when search bar is clicked', function (client) {
    this.pinboardPage.click('@searchBar');
    client.useXpath();
    client.waitForElementVisible('//div[starts-with(@class, "search-page")]', TIMEOUT);
    client.useCss();
    client.assert.urlContains('/search/');
  });

  it('should go to landing page when clicking on header', function (client) {
    const mainPage = client.page.main();

    this.pinboardPage.click('@header');
    client.assert.urlEquals(mainPage.url());
  });

  it('should stay on the same page when clicking on the menu item', function (client) {
    this.pinboardPage.click('@highlightedMenuItem');
    client.pause(100);
    client.assert.urlContains('pinboard/5cd06f2b/');
  });

  it('should be able to get back via breadcrumbs after navigate to officer page', function (client) {
    const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;

    relevantCoaccusalsSection.section.coaccusalCard.click('@coaccusalCount');
    const officerPage = client.page.officerPage();

    officerPage.expect.element('@officerName').text.to.equal('Richard Sullivan');
    client.assert.urlContains('/officer/123/richard-sullivan/');

    const breadcrumbs = officerPage.section.breadcrumbs;
    client.assertCount('.breadcrumbs > .breadcrumb-item-wrapper', 3);

    breadcrumbs.expect.element('@firstBreadcrumb').text.to.equal('cpdp');
    breadcrumbs.expect.element('@secondBreadcrumb').text.to.equal('Pinboard - Pinboard Title');
    breadcrumbs.expect.element('@thirdBreadcrumb').text.to.equal('Richard Sullivan');

    client.waitForAttribute('.breadcrumb-item-wrapper:nth-child(3)', 'class', function (className) {
      return className === 'breadcrumb-item-wrapper auto-width';
    });

    breadcrumbs.click('@secondBreadcrumb');

    client.assert.urlContains('/pinboard/5cd06f2b/');
  });

  context('pinboard pinned section', function () {
    it('should render the pinned cards correctly', function (client) {
      const pinboardPage = this.pinboardPage;
      const pinnedSection = pinboardPage.section.pinnedSection;

      const officers = pinnedSection.section.officers;
      let firstCard = officers.section.firstCard;
      officers.expect.element('@title').text.to.equal('OFFICERS');
      firstCard.expect.element('@firstCardRank').text.to.equal('Police Officer');
      firstCard.expect.element('@firstCardName').text.to.equal('Daryl Mack');
      firstCard.expect.element('@firstCardCRsCount').text.to.equal('10 complaints');

      const crs = pinnedSection.section.crs;
      firstCard = crs.section.firstCard;
      crs.expect.element('@title').text.to.equal('COMPLAINTS');
      firstCard.expect.element('@firstCardDate').text.to.equal('2010-01-01');
      firstCard.expect.element('@firstCardCategory').text.to.equal('Use Of Force');

      const trrs = pinnedSection.section.trrs;
      firstCard = trrs.section.firstCard;
      trrs.expect.element('@title').text.to.equal('TACTICAL RESPONSE REPORTS');
      firstCard.expect.element('@firstCardDate').text.to.equal('2012-01-01');
      firstCard.expect.element('@firstCardCategory').text.to.equal('Impact Weapon');
    });

    it('should show undo card when click on unpin button', function () {
      const pinboardPage = this.pinboardPage;
      const pinnedSection = pinboardPage.section.pinnedSection;

      const officers = pinnedSection.section.officers;
      let firstCard = officers.section.firstCard;

      firstCard.click('@firstCardUnpinBtn');

      firstCard.expect.element('@undoCard').to.be.visible;
    });
  });

  context('pinboard section', function () {
    it('should render correctly', function () {
      const pinboardPage = this.pinboardPage;
      pinboardPage.expect.element('@pinboardTitle').to.be.visible;
      pinboardPage.expect.element('@pinboardDescription').to.be.visible;
      pinboardPage.getValue('@pinboardTitle', function (result) {
        assert.equal(result.value, 'Pinboard Title');
      });
      pinboardPage.getValue('@pinboardDescription', function (result) {
        assert.equal(result.value, 'Pinboard Description');
      });

      pinboardPage.expect.section('@pinboardPaneMenu').to.be.visible;
      pinboardPage.expect.section('@pinboardPaneMenu').text.to.contain('Network');
      pinboardPage.expect.section('@pinboardPaneMenu').text.to.contain('Geographic');
    });

    it('should update title and description after editing and out focusing them', function (client) {
      const pinboardPage = this.pinboardPage;
      pinboardPage.expect.element('@pinboardTitle').to.be.visible;
      pinboardPage.expect.element('@pinboardDescription').to.be.visible;
      pinboardPage.getValue('@pinboardTitle', function (result) {
        assert.equal(result.value, 'Pinboard Title');
      });
      pinboardPage.getValue('@pinboardDescription', function (result) {
        assert.equal(result.value, 'Pinboard Description');
      });
      client.assert.urlContains('/pinboard-title/');

      pinboardPage.click('@pinboardTitle');
      pinboardPage.clearValue('@pinboardTitle');
      pinboardPage.setValue('@pinboardTitle', 'Updated Title');
      pinboardPage.click('@pinboardDescription');
      pinboardPage.clearValue('@pinboardDescription');
      pinboardPage.setValue('@pinboardDescription', 'Updated Description');
      pinboardPage.click('@pinboardPaneMenu');

      pinboardPage.getValue('@pinboardTitle', function (result) {
        assert.equal(result.value, 'Updated Title');
      });
      pinboardPage.getValue('@pinboardDescription', function (result) {
        assert.equal(result.value, 'Updated Description');
      });
      client.assert.urlContains('/updated-title/');
    });
  });

  context('relevant documents section', function () {
    it('should render document cards', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.expect.element('@title').text.to.equal('DOCUMENTS');
      relevantDocumentsSection.expect.element('@carouselTip').text.to.equal('<< Swipe for more');

      const documentCard = relevantDocumentsSection.section.documentCard;
      client.assertCount(`${relevantDocumentsSection.selector} ${documentCard.selector}`, 4);

      const firstDocumentCard = relevantDocumentsSection.section.documentCard;
      firstDocumentCard.expect.element('@plusButton').to.be.present;
      firstDocumentCard.expect.element('@incidentDate').text.to.equal('Apr 23, 2004');
      firstDocumentCard.expect.element('@category').text.to.equal('Lockup Procedures');
      firstDocumentCard.expect.element('@firstTopOfficerName').text.to.equal('R. Sullivan');
      firstDocumentCard.expect.element('@secondTopOfficerName').text.to.equal('B. Lopez');
      firstDocumentCard.expect.element('@notShowingOfficerCount').text.to.equal('3+');
    });

    it('should request more when sliding to the end', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      const documentCard = relevantDocumentsSection.section.documentCard;
      const cardSelector = `${relevantDocumentsSection.selector} ${documentCard.selector}`;
      client.assertCount(cardSelector, 4);

      const nthCardSelector = n => relevantDocumentsSection.selector +
        ` .swiper-slide:nth-child(${n}) > div:first-child`;

      _.times(3, idx => client.dragAndDrop(nthCardSelector(idx + 2), -200, 0));
      client.assertCount(cardSelector, 8);

      _.times(4, idx => client.dragAndDrop(nthCardSelector(idx + 5), -200, 0));
      client.assertCount(cardSelector, 10);
    });

    it('should go to complaint page when clicking on category', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.section.documentCard.click('@category');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on incidentDate', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.section.documentCard.click('@incidentDate');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on topOfficers', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.section.documentCard.click('@topOfficers');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on remainingOfficers', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.section.documentCard.click('@remainingOfficers');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to document pdf link in new tab when clicking on left half of a complaint card', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      relevantDocumentsSection.section.documentCard.click('@leftHalf');
      client.switchToRecentTab();
      client.assert.urlEquals(
        'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf'
      );
    });
  });

  context('relevant complaints section', function () {
    it('should render complaint cards', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.expect.element('@title').text.to.equal('COMPLAINTS');
      relevantComplaintsSection.expect.element('@carouselTip').text.to.equal('<< Swipe for more');

      const complaintCard = relevantComplaintsSection.section.complaintCard;
      client.assertCount(`${relevantComplaintsSection.selector} ${complaintCard.selector}`, 4);

      const firstComplaintCard = relevantComplaintsSection.section.complaintCard;
      firstComplaintCard.expect.element('@plusButton').to.be.present;
      firstComplaintCard.expect.element('@incidentDate').text.to.equal('Apr 23, 2004');
      firstComplaintCard.expect.element('@category').text.to.equal('Lockup Procedures');
      firstComplaintCard.expect.element('@firstTopOfficerName').text.to.equal('C. Suchocki');
      firstComplaintCard.expect.element('@secondTopOfficerName').text.to.equal('Q. Jones');
      firstComplaintCard.expect.element('@notShowingOfficerCount').text.to.equal('2+');
    });

    it('should request more when sliding to the end', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      const complaintCard = relevantComplaintsSection.section.complaintCard;
      const cardSelector = `${relevantComplaintsSection.selector} ${complaintCard.selector}`;
      client.pause(200);
      client.assertCount(cardSelector, 4);

      const nthCardSelector = n => relevantComplaintsSection.selector +
        ` .swiper-slide:nth-child(${n}) > div:first-child`;

      _.times(3, idx => client.dragAndDrop(nthCardSelector(idx + 2), -200, 0));
      client.assertCount(cardSelector, 8);

      _.times(4, idx => client.dragAndDrop(nthCardSelector(idx + 5), -200, 0));
      client.assertCount(cardSelector, 10);
    });

    it('should go to complaint page when clicking on category', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.section.complaintCard.click('@category');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on incidentDate', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.section.complaintCard.click('@incidentDate');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on topOfficers', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.section.complaintCard.click('@topOfficers');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on remainingOfficers', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.section.complaintCard.click('@remainingOfficers');
      client.assert.urlContains('/complaint/1071234/');
    });

    it('should go to complaint page when clicking on left half of a complaint card', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.section.complaintCard.click('@leftHalf');
      client.assert.urlContains('/complaint/1071234/');
    });
  });

  context('relevant coaccusals section', function () {
    it('should render coaccusal cards', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      relevantCoaccusalsSection.expect.element('@title').text.to.equal('COACCUSALS');
      relevantCoaccusalsSection.expect.element('@carouselTip').text.to.equal('<< Swipe for more');

      const coaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;
      const cardSelector = `${relevantCoaccusalsSection.selector} ${coaccusalCard.selector}`;
      client.assertCount(cardSelector, 4);

      const firstCoaccusalCard = coaccusalCard;
      firstCoaccusalCard.expect.element('@plusButton').to.be.present;
      firstCoaccusalCard.expect.element('@radarChart').to.be.present;
      firstCoaccusalCard.expect.element('@officerRank').text.to.equal('Detective');
      firstCoaccusalCard.expect.element('@officerName').text.to.equal('Richard Sullivan');
      firstCoaccusalCard.expect.element('@coaccusalCount').text.to.equal('53 coaccusals');
    });

    it('should request more when sliding to the end', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      const coaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;
      const cardSelector = `${relevantCoaccusalsSection.selector} ${coaccusalCard.selector}`;
      client.assertCount(cardSelector, 4);

      const nthCardSelector = n => relevantCoaccusalsSection.selector +
        ` .swiper-slide:nth-child(${n}) > a:first-child`;

      _.times(1, idx => client.dragAndDrop(nthCardSelector(idx + 2), -148, 0));
      client.assertCount(cardSelector, 8);

      _.times(6, idx => client.dragAndDrop(nthCardSelector(idx + 3), -148, 0));
      client.assertCount(cardSelector, 10);
    });

    it('should go to officer page when clicking on a nameWrapper', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      relevantCoaccusalsSection.section.coaccusalCard.click('@nameWrapper');
      client.assert.urlContains('/officer/123/richard-sullivan/');
    });

    it('should go to officer page when clicking on a coaccusalCount', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      relevantCoaccusalsSection.section.coaccusalCard.click('@coaccusalCount');
      client.assert.urlContains('/officer/123/richard-sullivan/');
    });
  });

  context('Geographic section', function () {
    it('should render geographic section', function () {
      const pinboardPage = this.pinboardPage;
      pinboardPage.expect.section('@pinboardPaneMenu').to.be.visible;
      pinboardPage.section.pinboardPaneMenu.click('@geographicPaneName');

      pinboardPage.expect.element('@complaintText').text.to.equal('Complaint');
      pinboardPage.expect.element('@complaintNumber').text.to.equal('5');
      pinboardPage.expect.element('@trrText').text.to.equal('Use of Force Report');
      pinboardPage.expect.element('@trrNumber').text.to.equal('2');
    });
  });
});
