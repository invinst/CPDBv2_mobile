'use strict';

var _ = require('lodash');
var assert = require('assert');
var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');

var mockData = require(__dirname + '/../mock-data/pinboard-page');
const { getPaginationResponse } = require(__dirname + '/../utils/getPaginationResponse');
const { mockGetAppConfig } = require(__dirname + '/../mock-data/app-config');


describe('Pinboard Page', function () {
  beforeEach(function (client, done) {
    api.cleanMock();
    api.mock('GET', '/api/v2/app-config/', 200, mockGetAppConfig);
    api.mock('GET', '/api/v2/mobile/officers/123/', 200, mockData.officer123);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/', 200, mockData.pinboardData);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/complaints/', 200, mockData.pinboardCRsData);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/officers/', 200, mockData.pinboardOfficersData);
    api.mock('GET', '/api/v2/mobile/pinboards/5cd06f2b/trrs/', 200, mockData.pinboardTRRsData);
    api.mock('GET', '/api/v2/mobile/social-graph/network/?pinboard_id=5cd06f2b', 200, mockData.socialGraphData);
    api.mock(
      'GET', '/api/v2/mobile/social-graph/geographic-crs/?pinboard_id=5cd06f2b', 200, mockData.geographicCrsData
    );
    api.mock(
      'GET', '/api/v2/mobile/social-graph/geographic-trrs/?pinboard_id=5cd06f2b', 200, mockData.geographicTrrsData
    );

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
    this.pinboardPage.expect.element('@body').to.be.present;
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
    client.assertCount('.breadcrumb-item', 3);
    breadcrumbs.expect.element('@firstBreadcrumb').text.to.equal('cpdp');
    breadcrumbs.expect.element('@secondBreadcrumb').text.to.equal('Pinboard - Pinboard Title');
    breadcrumbs.expect.element('@thirdBreadcrumb').text.to.equal('Richard Sullivan');

    breadcrumbs.expect.element('@secondBreadcrumb').to.have.attribute(
      'class', 'breadcrumb-item auto-width'
    );

    breadcrumbs.click('@secondBreadcrumb');

    client.assert.urlContains('/pinboard/5cd06f2b/');
  });

  it('should be visited if accessing a pinboard network map expanded mode via URL', function (client) {
    client.url('/social-graph/pinboard/5cd06f2b/');
    this.pinboardPage.expect.element('@pinboardTitle').text.to.equal('Pinboard Title').before(500);
    client.assert.urlContains('pinboard/5cd06f2b/pinboard-title/');
  });

  it('should be visited if accessing a pinboard geographic expanded mode via URL', function (client) {
    client.url('/geographic/pinboard/5cd06f2b/');
    this.pinboardPage.expect.element('@pinboardTitle').text.to.equal('Pinboard Title').before(500);
    client.assert.urlContains('pinboard/5cd06f2b/pinboard-title/');
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

    context('undo card', function () {
      context('pinned officers', function () {
        beforeEach(function (client, done) {
          api.mockPut(
            '/api/v2/mobile/pinboards/5cd06f2b/', 200,
            {
              'officer_ids': [],
              crids: ['1234567'],
              'trr_ids': ['1234'],
              title: 'Pinboard Title',
            },
            {
              id: '5cd06f2b',
              'officer_ids': [],
              crids: ['1234567'],
              'trr_ids': ['1234'],
              title: 'Pinboard Title',
              description: 'Pinboard Description',
            }
          );
          done();
        });

        it('should show undo card for 1 second when click on unpin button', function (client) {
          const pinboardPage = this.pinboardPage;
          const pinnedSection = pinboardPage.section.pinnedSection;

          const officers = pinnedSection.section.officers;

          let firstCard = officers.section.firstCard;
          firstCard.click('@firstCardUnpinBtn');
          firstCard.expect.element('@undoCard').to.be.visible;

          client.pause(1050);
          client.assertCount(officers.section.card.selector, 0);
        });

        it('should keep the current pinboard state when click undo', function (client) {
          const pinboardPage = this.pinboardPage;
          const pinnedSection = pinboardPage.section.pinnedSection;

          const officers = pinnedSection.section.officers;
          let firstCard = officers.section.firstCard;
          firstCard.click('@firstCardUnpinBtn');
          firstCard.expect.element('@undoCard').to.be.visible;
          firstCard.expect.element('@undoButton').to.be.visible;
          firstCard.click('@undoButton');

          client.assertCount(officers.section.card.selector, 1);
          officers.expect.element('@title').text.to.equal('OFFICERS');
          firstCard.expect.element('@firstCardRank').text.to.equal('Police Officer');
          firstCard.expect.element('@firstCardName').text.to.equal('Daryl Mack');
          firstCard.expect.element('@firstCardCRsCount').text.to.equal('10 complaints');
        });

        it('should go to officer page when clicked', function (client) {
          const pinboardPage = this.pinboardPage;
          const pinnedSection = pinboardPage.section.pinnedSection;

          const officers = pinnedSection.section.officers;
          const firstCard = officers.section.firstCard;
          firstCard.click('@mainElement');

          client.assert.urlContains('/officer/1234/daryl-mack/');
        });
      });

      context('pinned complaints', function () {
        beforeEach(function (client, done) {
          api.mockPut(
            '/api/v2/mobile/pinboards/5cd06f2b/', 200,
            {
              'officer_ids': [1234],
              crids: [],
              'trr_ids': ['1234'],
              title: 'Pinboard Title',
            },
            {
              id: '5cd06f2b',
              'officer_ids': [1234],
              crids: [],
              'trr_ids': ['1234'],
              title: 'Pinboard Title',
              description: 'Pinboard Description',
            }
          );
          done();
        });

        it('should show undo card for 1 second when click on unpin button', function (client) {
          const pinboardPage = this.pinboardPage;
          const pinnedSection = pinboardPage.section.pinnedSection;

          const crs = pinnedSection.section.crs;

          let firstCard = crs.section.firstCard;
          firstCard.click('@firstCardUnpinBtn');
          firstCard.expect.element('@undoCard').to.be.visible;

          client.pause(1050);
          client.assertCount(crs.section.card.selector, 0);
        });

        it('should keep the current pinboard state when click undo', function (client) {
          const pinboardPage = this.pinboardPage;
          const pinnedSection = pinboardPage.section.pinnedSection;

          const crs = pinnedSection.section.crs;

          let firstCard = crs.section.firstCard;
          firstCard.click('@firstCardUnpinBtn');
          firstCard.expect.element('@undoCard').to.be.visible;
          firstCard.expect.element('@undoButton').to.be.visible;
          firstCard.click('@undoButton');

          client.assertCount(crs.section.card.selector, 1);
          crs.expect.element('@title').text.to.equal('COMPLAINTS');
          firstCard.expect.element('@firstCardDate').text.to.equal('2010-01-01');
          firstCard.expect.element('@firstCardCategory').text.to.equal('Use Of Force');
        });

        it('should go to cr page when clicked', function (client) {
          const pinboardPage = this.pinboardPage;
          const pinnedSection = pinboardPage.section.pinnedSection;
          const crs = pinnedSection.section.crs;
          const firstCard = crs.section.firstCard;

          firstCard.click('@mainElement');

          client.assert.urlContains('/complaint/1234567/');
        });
      });

      context('pinned trrs', function () {
        beforeEach(function (client, done) {
          api.mockPut(
            '/api/v2/mobile/pinboards/5cd06f2b/', 200,
            {
              'officer_ids': [1234],
              crids: ['1234567'],
              'trr_ids': [],
              title: 'Pinboard Title',
            },
            {
              id: '5cd06f2b',
              'officer_ids': [1234],
              crids: ['1234567'],
              'trr_ids': [],
              title: 'Pinboard Title',
              description: 'Pinboard Description',
            }
          );
          done();
        });

        it('should show undo card for 1 second when click on unpin button', function (client) {
          const pinboardPage = this.pinboardPage;
          const pinnedSection = pinboardPage.section.pinnedSection;

          const trrs = pinnedSection.section.trrs;

          let firstCard = trrs.section.firstCard;
          firstCard.click('@firstCardUnpinBtn');
          firstCard.expect.element('@undoCard').to.be.visible;

          client.pause(1050);
          client.assertCount(trrs.section.card.selector, 0);
        });

        it('should keep the current pinboard state when click undo', function (client) {
          const pinboardPage = this.pinboardPage;
          const pinnedSection = pinboardPage.section.pinnedSection;

          const trrs = pinnedSection.section.trrs;

          let firstCard = trrs.section.firstCard;
          firstCard.click('@firstCardUnpinBtn');
          firstCard.expect.element('@undoCard').to.be.visible;
          firstCard.expect.element('@undoButton').to.be.visible;
          firstCard.click('@undoButton');

          client.assertCount(trrs.section.card.selector, 1);
          trrs.expect.element('@title').text.to.equal('TACTICAL RESPONSE REPORTS');
          firstCard.expect.element('@firstCardDate').text.to.equal('2012-01-01');
          firstCard.expect.element('@firstCardCategory').text.to.equal('Impact Weapon');
        });

        it('should go to trr page when clicked', function (client) {
          const pinboardPage = this.pinboardPage;
          const pinnedSection = pinboardPage.section.pinnedSection;
          const trrs = pinnedSection.section.trrs;
          const firstCard = trrs.section.firstCard;

          firstCard.click('@mainElement');

          client.assert.urlContains('/trr/1234/');
        });
      });
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
      pinboardPage.expect.element('@pinboardDescription').text.to.equal('Pinboard Description');
    });

    it('should update title and description after editing and out focusing them', function (client) {
      const pinboardPage = this.pinboardPage;
      pinboardPage.expect.element('@pinboardTitle').to.be.visible;
      pinboardPage.expect.element('@pinboardDescription').to.be.visible;
      pinboardPage.getValue('@pinboardTitle', function (result) {
        assert.equal(result.value, 'Pinboard Title');
      });
      pinboardPage.expect.element('@pinboardDescription').text.to.equal('Pinboard Description');
      client.assert.urlContains('/pinboard-title/');

      pinboardPage.click('@pinboardTitle');
      pinboardPage.clearValue('@pinboardTitle');
      pinboardPage.setValue('@pinboardTitle', 'Updated Title');
      pinboardPage.click('@visualizationTitle');

      pinboardPage.click('@pinboardDescription');
      pinboardPage.setValue('@pinboardDescription', ' **Updated**');
      pinboardPage.click('@visualizationTitle');

      pinboardPage.getValue('@pinboardTitle', function (result) {
        assert.equal(result.value, 'Updated Title');
      });
      pinboardPage.expect.element('@pinboardDescription').text.to.equal('Pinboard Description Updated');
      client.getElementProperty(pinboardPage.elements.pinboardDescription.selector, 'innerHTML', function (result) {
        assert.equal(result.value, '<p>Pinboard Description <strong>Updated</strong></p>');
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
      client.assertCount(documentCard.selector, 4);

      const firstDocumentCard = relevantDocumentsSection.section.documentCard;
      firstDocumentCard.expect.element('@plusButton').to.be.present;
      firstDocumentCard.expect.element('@incidentDate').text.to.equal('Apr 23, 2004');
      firstDocumentCard.expect.element('@category').text.to.equal('Lockup Procedures');
      firstDocumentCard.expect.element('@firstTopOfficerName').text.to.equal('R. Sullivan');
      firstDocumentCard.expect.element('@secondTopOfficerName').text.to.equal('B. Lopez');
      firstDocumentCard.expect.element('@notShowingOfficerCount').text.to.equal('3+');
      firstDocumentCard.expect.element('@firstRadarChart').to.have.css('background-color')
        .which.equal('rgba(245, 37, 36, 1)');
    });

    it('should request more when sliding to the end', function (client) {
      const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
      const documentCard = relevantDocumentsSection.section.documentCard;
      client.assertCount(documentCard.selector, 4);

      const nthCardSelector = n => relevantDocumentsSection.selector +
        ` .swiper-slide:nth-child(${n}) > div:first-child`;

      _.times(3, idx => client.dragAndDrop(nthCardSelector(idx + 2), -200, 0));
      this.pinboardPage.waitForElementPresent(nthCardSelector(8));
      client.assertCount(documentCard.selector, 8);

      _.times(4, idx => client.dragAndDrop(nthCardSelector(idx + 5), -200, 0));
      this.pinboardPage.waitForElementPresent(nthCardSelector(10));
      client.assertCount(documentCard.selector, 10);
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

    context('undo card', function () {
      context('adding relevant coaccusal to pinboard', function () {
        const updatedRelevantDocumentsResponse = getPaginationResponse(
          mockData.baseRelevantDocumentsUrl,
          (number) => _.times(number).map(mockData.generateRelevantDocument),
          6, 0, 6
        );

        const updatedRelevantCoaccusalsResponse = getPaginationResponse(
          mockData.baseRelevantCoaccusalsUrl,
          (number) => _.times(number, index => mockData.generateRelevantCoaccusal(index + 40)),
          3, 0, 3
        );

        const updatedRelevantComplaintsResponse = getPaginationResponse(
          mockData.baseRelevantComplaintsUrl,
          (number) => _.times(number, index => mockData.generateRelevantComplaint(`${index}`)),
          8, 0, 8
        );

        beforeEach(function (client, done) {
          api.mockPut(
            '/api/v2/mobile/pinboards/5cd06f2b/', 200,
            {
              'officer_ids': ['1234', '123'],
              crids: ['1234567'],
              'trr_ids': ['1234'],
              title: 'Pinboard Title',
              description: 'Pinboard Description',
            },
            {
              id: '5cd06f2b',
              'officer_ids': ['1234', '123'],
              crids: ['1234567'],
              'trr_ids': ['1234'],
              title: 'Pinboard Title',
              description: 'Pinboard Description',
            }
          );

          api.mock('GET', mockData.baseRelevantDocumentsUrl, 200, updatedRelevantDocumentsResponse);

          api.mock('GET', mockData.baseRelevantCoaccusalsUrl, 200, updatedRelevantCoaccusalsResponse);

          api.mock('GET', mockData.baseRelevantComplaintsUrl, 200, updatedRelevantComplaintsResponse);

          done();
        });

        it('should show undo card for 1 second for adding relevant coaccusals', function (client) {
          const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
          const firstCoaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;

          firstCoaccusalCard.waitForElementVisible('@plusButton', TIMEOUT);
          firstCoaccusalCard.click('@plusButton');

          firstCoaccusalCard.expect.element('@undoText').to.be.present;
          firstCoaccusalCard.expect.element('@undoButton').to.be.present;

          firstCoaccusalCard.expect.element('@undoText').text.to.equal('Richard Sullivan added.');
          firstCoaccusalCard.expect.element('@undoButton').text.to.equal('Undo');

          const pinnedSection = this.pinboardPage.section.pinnedSection;
          pinnedSection.section.officers.expect.section('@secondCard').to.be.present.after(2000);
          const secondCard = pinnedSection.section.officers.section.secondCard;
          secondCard.expect.element('@officerName').text.to.equal('Richard Sullivan');

          client.assertCount(pinnedSection.section.officers.section.card.selector, 2);
          client.assertCount(relevantCoaccusalsSection.section.coaccusalCard.selector, 3);
          client.assertCount(this.pinboardPage.section.relevantDocuments.section.documentCard.selector, 6);
          client.assertCount(this.pinboardPage.section.relevantComplaints.section.complaintCard.selector, 8);
        });

        it('should keep the current pinboard state when click undo', function (client) {
          const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
          const firstCoaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;

          firstCoaccusalCard.waitForElementVisible('@plusButton', TIMEOUT);
          firstCoaccusalCard.click('@plusButton');

          firstCoaccusalCard.expect.element('@undoButton').to.be.present;
          firstCoaccusalCard.click('@undoButton');

          // The card should not disappear
          firstCoaccusalCard.expect.element('@plusButton').to.be.present;
          firstCoaccusalCard.expect.element('@radarChart').to.be.present;
          firstCoaccusalCard.expect.element('@officerRank').text.to.equal('Detective');
          firstCoaccusalCard.expect.element('@officerName').text.to.equal('Richard Sullivan');
          firstCoaccusalCard.expect.element('@coaccusalCount').text.to.equal('53 coaccusals');

          // Other sections should not change
          const pinnedSection = this.pinboardPage.section.pinnedSection;
          client.assertCount(pinnedSection.section.officers.section.card.selector, 1);
          client.assertCount(pinnedSection.section.crs.section.card.selector, 1);
          client.assertCount(pinnedSection.section.trrs.section.card.selector, 1);

          client.assertCount(this.pinboardPage.section.relevantDocuments.section.documentCard.selector, 4);
          client.assertCount(this.pinboardPage.section.relevantCoaccusals.section.coaccusalCard.selector, 4);
          client.assertCount(this.pinboardPage.section.relevantComplaints.section.complaintCard.selector, 4);
        });
      });

      context('adding relevant complaint to pinboard', function () {
        const updatedRelevantDocumentsResponse = getPaginationResponse(
          mockData.baseRelevantDocumentsUrl,
          (number) => _.times(number).map(mockData.generateRelevantDocument),
          6, 0, 6
        );

        const updatedRelevantCoaccusalsResponse = getPaginationResponse(
          mockData.baseRelevantCoaccusalsUrl,
          (number) => _.times(number, index => mockData.generateRelevantCoaccusal(index + 40)),
          8, 0, 8
        );

        const updatedRelevantComplaintsResponse = getPaginationResponse(
          mockData.baseRelevantComplaintsUrl,
          (number) => _.times(number, index => mockData.generateRelevantComplaint(`${index}`)),
          3, 0, 3
        );

        beforeEach(function (client, done) {
          api.mockPut(
            '/api/v2/mobile/pinboards/5cd06f2b/', 200,
            {
              'officer_ids': ['1234'],
              crids: ['1234567', '1071234'],
              'trr_ids': ['1234'],
              title: 'Pinboard Title',
              description: 'Pinboard Description',
            },
            {
              id: '5cd06f2b',
              'officer_ids': ['1234'],
              crids: ['1234567', '1071234'],
              'trr_ids': ['1234'],
              title: 'Pinboard Title',
              description: 'Pinboard Description',
            }
          );

          api.mock('GET', mockData.baseRelevantDocumentsUrl, 200, updatedRelevantDocumentsResponse);

          api.mock('GET', mockData.baseRelevantCoaccusalsUrl, 200, updatedRelevantCoaccusalsResponse);

          api.mock('GET', mockData.baseRelevantComplaintsUrl, 200, updatedRelevantComplaintsResponse);

          done();
        });

        it('should show undo card for 1 second for adding relevant complaint', function (client) {
          const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
          const firstComplaintCard = relevantComplaintsSection.section.complaintCard;

          firstComplaintCard.waitForElementVisible('@plusButton', TIMEOUT);
          firstComplaintCard.click('@plusButton');

          firstComplaintCard.expect.element('@undoText').to.be.present;
          firstComplaintCard.expect.element('@undoButton').to.be.present;

          firstComplaintCard.expect.element('@undoText').text.to.equal('Complaint added.');
          firstComplaintCard.expect.element('@undoButton').text.to.equal('Undo');

          const pinnedSection = this.pinboardPage.section.pinnedSection;
          const secondCard = pinnedSection.section.crs.section.secondCard;

          pinnedSection.section.crs.expect.section('@secondCard').to.be.visible.after(2000);
          secondCard.expect.element('@category').text.to.equal('Lockup Procedures');

          client.assertCount(pinnedSection.section.crs.section.card.selector, 2);
          client.assertCount(relevantComplaintsSection.section.complaintCard.selector, 3);
          client.assertCount(this.pinboardPage.section.relevantDocuments.section.documentCard.selector, 6);
          client.assertCount(this.pinboardPage.section.relevantCoaccusals.section.coaccusalCard.selector, 8);
        });

        it('should keep the current pinboard state when click undo', function (client) {
          const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
          const firstComplaintCard = relevantComplaintsSection.section.complaintCard;

          firstComplaintCard.waitForElementVisible('@plusButton', TIMEOUT);
          firstComplaintCard.click('@plusButton');

          firstComplaintCard.expect.element('@undoButton').to.be.present;
          firstComplaintCard.click('@undoButton');

          // The card should not disappear
          firstComplaintCard.expect.element('@plusButton').to.be.present;
          firstComplaintCard.expect.element('@incidentDate').text.to.equal('Apr 23, 2004');
          firstComplaintCard.expect.element('@category').text.to.equal('Lockup Procedures');
          firstComplaintCard.expect.element('@firstTopOfficerName').text.to.equal('C. Suchocki');
          firstComplaintCard.expect.element('@secondTopOfficerName').text.to.equal('Q. Jones');
          firstComplaintCard.expect.element('@notShowingOfficerCount').text.to.equal('2+');

          // Other sections should not change
          const pinnedSection = this.pinboardPage.section.pinnedSection;
          client.assertCount(pinnedSection.section.officers.section.card.selector, 1);
          client.assertCount(pinnedSection.section.crs.section.card.selector, 1);
          client.assertCount(pinnedSection.section.trrs.section.card.selector, 1);

          client.assertCount(this.pinboardPage.section.relevantDocuments.section.documentCard.selector, 4);
          client.assertCount(this.pinboardPage.section.relevantCoaccusals.section.coaccusalCard.selector, 4);
          client.assertCount(this.pinboardPage.section.relevantComplaints.section.complaintCard.selector, 4);
        });
      });

      context('adding relevant document to pinboard', function () {
        const updatedRelevantCoaccusalsResponse = getPaginationResponse(
          mockData.baseRelevantCoaccusalsUrl,
          (number) => _.times(number, index => mockData.generateRelevantCoaccusal(index + 40)),
          8, 0, 8
        );

        const updatedRelevantComplaintsResponse = getPaginationResponse(
          mockData.baseRelevantComplaintsUrl,
          (number) => _.times(number, index => mockData.generateRelevantComplaint(`${index}`)),
          6, 0, 6
        );

        beforeEach(function (client, done) {
          api.mockPut(
            '/api/v2/mobile/pinboards/5cd06f2b/', 200,
            {
              'officer_ids': ['1234'],
              crids: ['1234567', '1071234'],
              'trr_ids': ['1234'],
              title: 'Pinboard Title',
              description: 'Pinboard Description',
            },
            {
              id: '5cd06f2b',
              'officer_ids': ['1234'],
              crids: ['1234567', '1071234'],
              'trr_ids': ['1234'],
              title: 'Pinboard Title',
              description: 'Pinboard Description',
            }
          );

          api.mock('GET', mockData.baseRelevantCoaccusalsUrl, 200, updatedRelevantCoaccusalsResponse);

          api.mock('GET', mockData.baseRelevantComplaintsUrl, 200, updatedRelevantComplaintsResponse);

          done();
        });

        it('should show undo card for 1 second for adding relevant document', function (client) {
          const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
          const firstDocumentCard = relevantDocumentsSection.section.documentCard;

          firstDocumentCard.waitForElementVisible('@plusButton', TIMEOUT);
          firstDocumentCard.click('@plusButton');

          firstDocumentCard.expect.element('@undoText').to.be.present;
          firstDocumentCard.expect.element('@undoButton').to.be.present;

          firstDocumentCard.expect.element('@undoText').text.to.equal('Document added.');
          firstDocumentCard.expect.element('@undoButton').text.to.equal('Undo');

          const crs = this.pinboardPage.section.pinnedSection.section.crs;

          crs.expect.section('@secondCard').to.be.visible.after(1100);
          crs.section.secondCard.expect.element('@category').text.to.equal('Lockup Procedures');

          client.assertCount(crs.section.card.selector, 2);
          client.assertCount(relevantDocumentsSection.section.documentCard.selector, 4);
          client.assertCount(this.pinboardPage.section.relevantComplaints.section.complaintCard.selector, 6);
          client.assertCount(this.pinboardPage.section.relevantCoaccusals.section.coaccusalCard.selector, 8);

          // Should reserve the original card after 1 second
          firstDocumentCard.expect.element('@incidentDate').text.to.equal('Apr 23, 2004');
          firstDocumentCard.expect.element('@category').text.to.equal('Lockup Procedures');
          firstDocumentCard.expect.element('@firstTopOfficerName').text.to.equal('R. Sullivan');
          firstDocumentCard.expect.element('@secondTopOfficerName').text.to.equal('B. Lopez');
          firstDocumentCard.expect.element('@notShowingOfficerCount').text.to.equal('3+');
          firstDocumentCard.expect.element('@plusButton').to.be.not.present;
        });

        it('should keep the current pinboard state when click undo', function (client) {
          const relevantDocumentsSection = this.pinboardPage.section.relevantDocuments;
          const firstDocumentCard = relevantDocumentsSection.section.documentCard;

          firstDocumentCard.waitForElementVisible('@plusButton', TIMEOUT);
          firstDocumentCard.click('@plusButton');

          firstDocumentCard.expect.element('@undoButton').to.be.present;
          firstDocumentCard.click('@undoButton');

          // The card should not disappear
          firstDocumentCard.expect.element('@plusButton').to.be.present;
          firstDocumentCard.expect.element('@incidentDate').text.to.equal('Apr 23, 2004');
          firstDocumentCard.expect.element('@category').text.to.equal('Lockup Procedures');
          firstDocumentCard.expect.element('@firstTopOfficerName').text.to.equal('R. Sullivan');
          firstDocumentCard.expect.element('@secondTopOfficerName').text.to.equal('B. Lopez');
          firstDocumentCard.expect.element('@notShowingOfficerCount').text.to.equal('3+');

          // Other sections should not change
          const pinnedSection = this.pinboardPage.section.pinnedSection;
          client.assertCount(pinnedSection.section.officers.section.card.selector, 1);
          client.assertCount(pinnedSection.section.crs.section.card.selector, 1);
          client.assertCount(pinnedSection.section.trrs.section.card.selector, 1);

          client.assertCount(this.pinboardPage.section.relevantDocuments.section.documentCard.selector, 4);
          client.assertCount(this.pinboardPage.section.relevantCoaccusals.section.coaccusalCard.selector, 4);
          client.assertCount(this.pinboardPage.section.relevantComplaints.section.complaintCard.selector, 4);
        });
      });
    });
  });

  context('relevant complaints section', function () {
    it('should render complaint cards', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      relevantComplaintsSection.expect.element('@title').text.to.equal('COMPLAINTS');
      relevantComplaintsSection.expect.element('@carouselTip').text.to.equal('<< Swipe for more');

      const complaintCard = relevantComplaintsSection.section.complaintCard;
      client.assertCount(complaintCard.selector, 4);

      const firstComplaintCard = relevantComplaintsSection.section.complaintCard;
      firstComplaintCard.expect.element('@plusButton').to.be.present;
      firstComplaintCard.expect.element('@incidentDate').text.to.equal('Apr 23, 2004');
      firstComplaintCard.expect.element('@category').text.to.equal('Lockup Procedures');
      firstComplaintCard.expect.element('@firstTopOfficerName').text.to.equal('C. Suchocki');
      firstComplaintCard.expect.element('@secondTopOfficerName').text.to.equal('Q. Jones');
      firstComplaintCard.expect.element('@notShowingOfficerCount').text.to.equal('2+');
      firstComplaintCard.expect.element('@firstRadarChart').to.have.css('background-color')
        .which.equal('rgba(245, 37, 36, 1)');
    });

    it('should request more when sliding to the end', function (client) {
      const relevantComplaintsSection = this.pinboardPage.section.relevantComplaints;
      const complaintCard = relevantComplaintsSection.section.complaintCard;
      const cardSelector = complaintCard.selector;
      client.pause(200);
      client.assertCount(cardSelector, 4);

      const nthCardSelector = n => relevantComplaintsSection.selector +
        ` .swiper-slide:nth-child(${n}) > div:first-child`;

      _.times(3, idx => client.dragAndDrop(nthCardSelector(idx + 2), -200, 0));
      this.pinboardPage.waitForElementPresent(nthCardSelector(8));
      client.assertCount(cardSelector, 8);

      _.times(4, idx => client.dragAndDrop(nthCardSelector(idx + 5), -200, 0));
      this.pinboardPage.waitForElementPresent(nthCardSelector(10));
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
    it.only('should render coaccusal cards', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      relevantCoaccusalsSection.expect.element('@title').text.to.equal('COACCUSALS');
      relevantCoaccusalsSection.expect.element('@carouselTip').text.to.equal('<< Swipe for more');

      const coaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;
      const cardSelector = coaccusalCard.selector;
      client.assertCount(cardSelector, 4);

      const firstCoaccusalCard = coaccusalCard;
      firstCoaccusalCard.expect.element('@plusButton').to.be.present;
      firstCoaccusalCard.expect.element('@radarChart').to.be.present;
      firstCoaccusalCard.expect.element('@officerRank').text.to.equal('Detective');
      firstCoaccusalCard.expect.element('@officerName').text.to.equal('Richard Sullivan');
      firstCoaccusalCard.expect.element('@coaccusalCount').text.to.equal('53 coaccusals');
      firstCoaccusalCard.expect.element('@radarChart').to.have.css('background-color')
        .which.equal('rgba(245, 37, 36, 1)');
    });

    it('should request more when sliding to the end', function (client) {
      const relevantCoaccusalsSection = this.pinboardPage.section.relevantCoaccusals;
      const coaccusalCard = relevantCoaccusalsSection.section.coaccusalCard;
      const cardSelector = coaccusalCard.selector;
      client.assertCount(cardSelector, 4);

      const nthCardSelector = n => relevantCoaccusalsSection.selector +
        ` .swiper-slide:nth-child(${n}) > *:first-child`;

      _.times(1, idx => client.dragAndDrop(nthCardSelector(idx + 2), -148, 0));
      this.pinboardPage.waitForElementPresent(nthCardSelector(8));
      client.assertCount(cardSelector, 8);

      _.times(6, idx => client.dragAndDrop(nthCardSelector(idx + 3), -148, 0));
      this.pinboardPage.waitForElementPresent(nthCardSelector(10));
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

  context('Pinboard visualization', function () {
    it.only('should render animated social graph and geographic section', function (client) {
      client.pause(9999999);
      const pinboardPage = this.pinboardPage;
      client.resizeWindow(500, 1000);
      const animatedSocialGraphSection = pinboardPage.section.animatedSocialGraphSection;
      const geographicSection = pinboardPage.section.geographicSection;

      client.assertInViewport(animatedSocialGraphSection.selector, animatedSocialGraphSection.locateStrategy);
      client.assertInViewport(geographicSection.selector, geographicSection.locateStrategy, false);

      pinboardPage.expect.element('@navigationPreviousButton').to.be.not.visible;
      pinboardPage.expect.element('@navigationNextButton').to.be.visible;
      pinboardPage.expect.element('@firstBullet').to.have.attribute('class').equals(
        'swiper-pagination-bullet swiper-pagination-bullet-active'
      );
      pinboardPage.click('@navigationNextButton');

      client.waitForAnimationEnd(geographicSection.selector, geographicSection.locateStrategy);
      client.assertInViewport(animatedSocialGraphSection.selector, animatedSocialGraphSection.locateStrategy, false);
      client.assertInViewport(geographicSection.selector, geographicSection.locateStrategy);
      pinboardPage.expect.element('@navigationNextButton').to.be.not.visible;
      pinboardPage.expect.element('@navigationPreviousButton').to.be.visible;
      pinboardPage.expect.element('@secondBullet').to.have.attribute('class').equals(
        'swiper-pagination-bullet swiper-pagination-bullet-active'
      );

      pinboardPage.click('@navigationPreviousButton');
      client.waitForAnimationEnd(animatedSocialGraphSection.selector, animatedSocialGraphSection.locateStrategy);
      client.assertInViewport(animatedSocialGraphSection.selector, animatedSocialGraphSection.locateStrategy);
      client.assertInViewport(geographicSection.selector, geographicSection.locateStrategy, false);
    });
  });

  context('manage pinboards', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/mobile/pinboards/', 200, mockData.pinboardsList.list);
      api.mock('GET', '/api/v2/mobile/pinboards/23ffd689/', 200, mockData.pinboardsList.pinboards[0]);
      api.mock('GET', '/api/v2/mobile/pinboards/7e1e3c88/', 200, mockData.pinboardsList.pinboards[1]);
      done();
    });

    it('should render the pinboards list', function (client) {
      const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
      this.pinboardPage.click('@pinboardsListButton');

      pinboardsListSection.waitForElementVisible('@pinboardsTitle');
      const pinboardItems = pinboardsListSection.elements.pinboardItems;
      client.elements(pinboardItems.locateStrategy, pinboardItems.selector, function (result) {
        assert.equal(result.value.length, 3);
      });

      pinboardsListSection.expect.element('@firstPinboardItemTitle').text.to.equal('Watts Crew');
      pinboardsListSection.expect.element('@firstPinboardItemCreatedAt').text.to.equal('Created May 06, 2020');

      pinboardsListSection.expect.element('@secondPinboardItemTitle').text.to.equal('');
      pinboardsListSection.expect.element('@secondPinboardItemCreatedAt').text.to.equal('Created Aug 07, 2020');

      pinboardsListSection.expect.element('@thirdPinboardItemTitle').text.to.equal('');
      pinboardsListSection.expect.element('@thirdPinboardItemCreatedAt').text.to.equal('Created Dec 20, 2020');
    });

    context('clicking on pinboard item', function () {
      it('should go to pinboard detail page', function (client) {
        const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
        this.pinboardPage.click('@pinboardsListButton');
        client.assert.urlContains('pinboard/5cd06f2b/');

        pinboardsListSection.click('@firstPinboardItemTitle');
        client.pause(100);
        client.assert.urlContains('pinboard/23ffd689/');

        this.pinboardPage.expect.element('@pinboardTitle').text.to.equal('Watts Crew').before(500);
        this.pinboardPage.expect.element('@pinboardDescription').text.to.equal('This is Watts Crew').before(500);
      });

      context('users remove pinned item from current pinboard and current pinboard is saved', function () {
        it('should go to target pinboard detail page', function (client) {
          api.mockPut(
            '/api/v2/mobile/pinboards/5cd06f2b/', 200,
            mockData.updatePinboardCrsRequest,
            mockData.updatePinboardCrsResponse
          );
          const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
          this.pinboardPage.section.pinnedSection.section.crs.section.firstCard.click('@firstCardUnpinBtn');
          client.pause(4500);

          this.pinboardPage.click('@pinboardsListButton');
          pinboardsListSection.waitForElementVisible('@firstPinboardItemTitle');
          pinboardsListSection.click('@firstPinboardItemTitle');
          client.pause(100);
          client.assert.urlContains('pinboard/23ffd689/');

          this.pinboardPage.expect.element('@pinboardTitle').text.to.equal('Watts Crew').before(500);
          this.pinboardPage.expect.element('@pinboardDescription').text.to.equal('This is Watts Crew').before(500);
        });
      });

      context('users add relevant item to current pinboard and current pinboard is saved', function () {
        it('should go to target pinboard detail page', function (client) {
          api.mockPut(
            '/api/v2/mobile/pinboards/5cd06f2b/', 200,
            mockData.updatePinboardCoaccusalsRequest,
            mockData.updatePinboardCoaccusalsResponse
          );
          const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
          this.pinboardPage.section.relevantCoaccusals.sections.coaccusalCard.click('@plusButton');
          client.pause(4500);

          this.pinboardPage.click('@pinboardsListButton');
          pinboardsListSection.click('@firstPinboardItemTitle');
          client.pause(100);
          client.assert.urlContains('pinboard/23ffd689/');

          this.pinboardPage.expect.element('@pinboardTitle').text.to.equal('Watts Crew').before(500);
          this.pinboardPage.expect.element('@pinboardDescription').text.to.equal('This is Watts Crew').before(500);
        });
      });

      context('pinboard is saving', function () {
        context('pinboard is saving with long api call', function () {
          context('users confirm yes', function () {
            it('should go to pinboard detail page', function (client) {
              api.mockPut(
                '/api/v2/mobile/pinboards/5cd06f2b/', 200,
                mockData.updatePinboardCrsRequest,
                mockData.updatePinboardCrsResponse,
                10000
              );
              const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
              this.pinboardPage.section.pinnedSection.section.crs.section.firstCard.click('@firstCardUnpinBtn');
              client.pause(2000);
              this.pinboardPage.click('@pinboardsListButton');
              pinboardsListSection.waitForElementVisible('@firstPinboardItemTitle');
              pinboardsListSection.click('@firstPinboardItemTitle');

              client.waitForAlertText(function (value) {
                assert.ok(typeof (value) === 'string');
                assert.ok(value.includes('Pinboard is saving'));
              }, 5000);

              client.acceptAlert(function () {
                client.pause(500);
                client.assert.urlContains('pinboard/23ffd689/watts-crew/');
              });

              this.pinboardPage.expect.element('@pinboardTitle').text.to.equal('Watts Crew').before(500);
              this.pinboardPage.expect.element('@pinboardDescription').text.to.equal('This is Watts Crew').before(500);
            });
          });
        });

        context('users remove pinned items and pinboard saving errors', function () {
          context('users confirm yes', function () {
            it('should go to pinboard detail page', function (client) {
              const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
              this.pinboardPage.section.pinnedSection.section.crs.section.firstCard.click('@firstCardUnpinBtn');
              client.pause(2000);
              this.pinboardPage.click('@pinboardsListButton');
              pinboardsListSection.waitForElementVisible('@firstPinboardItemTitle');
              pinboardsListSection.click('@firstPinboardItemTitle');

              client.waitForAlertText(function (value) {
                assert.ok(typeof (value) === 'string');
                assert.ok(value.includes('Pinboard is saving'));
              }, 5000);

              client.acceptAlert(function () {
                client.pause(500);
                client.assert.urlContains('pinboard/23ffd689/watts-crew/');
              });

              this.pinboardPage.expect.element('@pinboardTitle').text.to.equal('Watts Crew').before(500);
              this.pinboardPage.expect.element('@pinboardDescription').text.to.equal('This is Watts Crew').before(500);
            });
          });
        });

        context('users add relevant item and pinboard saving errors', function () {
          context('users confirm yes', function () {
            it('should go to pinboard detail page', function (client) {
              api.mockPut(
                '/api/v2/mobile/pinboards/5cd06f2b/', 200,
                mockData.updatePinboardCoaccusalsRequest,
                mockData.updatePinboardCoaccusalsResponse,
                10000
              );
              const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
              this.pinboardPage.section.relevantCoaccusals.sections.coaccusalCard.click('@plusButton');
              client.pause(4500);

              this.pinboardPage.click('@pinboardsListButton');
              pinboardsListSection.waitForElementVisible('@firstPinboardItemTitle');
              pinboardsListSection.click('@firstPinboardItemTitle');

              client.waitForAlertText(function (value) {
                assert.ok(typeof (value) === 'string');
                assert.ok(value.includes('Pinboard is saving'));
              }, 5000);

              client.acceptAlert(function () {
                client.pause(500);
                client.assert.urlContains('pinboard/23ffd689/watts-crew/');
              });

              this.pinboardPage.expect.element('@pinboardTitle').text.to.equal('Watts Crew').before(500);
              this.pinboardPage.expect.element('@pinboardDescription').text.to.equal('This is Watts Crew').before(500);
            });
          });
        });

        context('users confirm yes', function () {
          it('should go to pinboard detail page and will not show alert again', function (client) {
            api.mockPut(
              '/api/v2/mobile/pinboards/5cd06f2b/', 200,
              mockData.updatePinboardCrsRequest,
              mockData.updatePinboardCrsResponse,
              10000
            );
            const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
            this.pinboardPage.section.pinnedSection.section.crs.section.firstCard.click('@firstCardUnpinBtn');
            client.pause(2000);
            this.pinboardPage.click('@pinboardsListButton');
            pinboardsListSection.waitForElementVisible('@firstPinboardItemTitle');
            pinboardsListSection.click('@firstPinboardItemTitle');

            client.waitForAlertText(function (value) {
              assert.ok(typeof (value) === 'string');
              assert.ok(value.includes('Pinboard is saving'));
            }, 5000);

            client.acceptAlert(function () {
              client.pause(500);
              client.assert.urlContains('pinboard/23ffd689/watts-crew/');
            });

            this.pinboardPage.click('@pinboardsListButton');
            pinboardsListSection.waitForElementVisible('@secondPinboardItemCreatedAt');
            pinboardsListSection.click('@secondPinboardItemCreatedAt');

            client.pause(500);
            client.assert.urlContains('pinboard/7e1e3c88/untitled-pinboard/');
            this.pinboardPage.expect.element('@pinboardTitle').text.to.equal('').before(500);
            this.pinboardPage.expect.element('@pinboardDescription').text.to.equal('Pinboard Description').before(500);
          });
        });

        context('user confirm no', function () {
          it('should still in current page', function (client) {
            api.mockPut(
              '/api/v2/mobile/pinboards/5cd06f2b/', 200,
              mockData.updatePinboardCrsRequest,
              mockData.updatePinboardCrsResponse,
              10000
            );
            const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
            this.pinboardPage.section.pinnedSection.section.crs.section.firstCard.click('@firstCardUnpinBtn');
            client.pause(2000);
            this.pinboardPage.click('@pinboardsListButton');
            pinboardsListSection.waitForElementVisible('@firstPinboardItemTitle');
            pinboardsListSection.click('@firstPinboardItemTitle');

            client.waitForAlertText(function (value) {
              assert.ok(typeof (value) === 'string');
              assert.ok(value.includes('Pinboard is saving'));
            }, 5000);

            client.dismissAlert(function () {
              client.pause(500);
              client.assert.urlContains('pinboard/5cd06f2b/');
            });
          });
        });
      });
    });

    context('clicking on create new pinboard button in menu', function () {
      it('should create an empty pinboard', function (client) {
        api.mockPost(
          '/api/v2/mobile/pinboards/',
          201,
          undefined,
          mockData.pinboardsList.pinboards[3]
        );
        const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
        this.pinboardPage.click('@pinboardsListButton');
        pinboardsListSection.waitForElementVisible('@createNewPinboardButton');
        pinboardsListSection.click('@createNewPinboardButton');

        client.pause(100);
        client.assert.urlContains('pinboard/823f123e/');
      });

      it('should create an empty pinboard if pinboard is saving and user confirm yes', function (client) {
        api.mockPost(
          '/api/v2/mobile/pinboards/',
          201,
          undefined,
          mockData.pinboardsList.pinboards[3]
        );
        api.mockPut(
          '/api/v2/mobile/pinboards/5cd06f2b/', 200,
          mockData.updatePinboardCrsRequest,
          mockData.updatePinboardCrsResponse,
          10000
        );
        const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
        this.pinboardPage.section.pinnedSection.section.crs.section.firstCard.click('@firstCardUnpinBtn');
        client.pause(2000);
        this.pinboardPage.click('@pinboardsListButton');
        pinboardsListSection.waitForElementVisible('@createNewPinboardButton');
        pinboardsListSection.click('@createNewPinboardButton');

        client.waitForAlertText(function (value) {
          assert.ok(typeof (value) === 'string');
          assert.ok(value.includes('Pinboard is saving'));
        }, 5000);

        client.acceptAlert(function () {
          client.pause(500);
          client.assert.urlContains('pinboard/823f123e/');
        });
      });

      it('should still in current page if pinboard is saving and user confirm no', function (client) {
        api.mockPut(
          '/api/v2/mobile/pinboards/5cd06f2b/', 200,
          mockData.updatePinboardCrsRequest,
          mockData.updatePinboardCrsResponse,
          10000
        );
        const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
        const crsPinnedSection = this.pinboardPage.section.pinnedSection.section.crs;
        const firstCrPinnedCard = crsPinnedSection.section.firstCard;
        firstCrPinnedCard.click('@firstCardUnpinBtn');
        client.pause(2000);
        this.pinboardPage.click('@pinboardsListButton');
        pinboardsListSection.waitForElementVisible('@createNewPinboardButton');
        pinboardsListSection.click('@createNewPinboardButton');

        client.waitForAlertText(function (value) {
          assert.ok(typeof (value) === 'string');
          assert.ok(value.includes('Pinboard is saving'));
        }, 5000);

        client.dismissAlert(function () {
          client.pause(500);
          client.assert.urlContains('pinboard/5cd06f2b/');
        });
      });
    });

    context('clicking on Duplicate this pinboard button', function () {
      it('should duplicate current pinboard', function (client) {
        api.mockPost(
          '/api/v2/mobile/pinboards/', 200,
          mockData.pinboardsList.duplicatePinboardRequest,
          mockData.pinboardsList.duplicatePinboardResponse
        );
        const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
        this.pinboardPage.click('@pinboardsListButton');
        pinboardsListSection.waitForElementVisible('@firstDuplicatePinboardButton');
        pinboardsListSection.click('@firstDuplicatePinboardButton');

        client.pause(1000);
        client.assert.urlContains('pinboard/283fea1f/');
      });

      it('should duplicate current pinboard if pinboard is saving and user confirm yes', function (client) {
        api.mockPost(
          '/api/v2/mobile/pinboards/', 200,
          mockData.pinboardsList.duplicatePinboardRequest,
          mockData.pinboardsList.duplicatePinboardResponse
        );
        api.mockPut(
          '/api/v2/mobile/pinboards/5cd06f2b/', 200,
          mockData.updatePinboardCrsRequest,
          mockData.updatePinboardCrsResponse,
          10000
        );
        const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
        const crsPinnedSection = this.pinboardPage.section.pinnedSection.section.crs;
        const firstCrPinnedCard = crsPinnedSection.section.firstCard;
        firstCrPinnedCard.click('@firstCardUnpinBtn');
        client.pause(2000);
        this.pinboardPage.click('@pinboardsListButton');
        pinboardsListSection.click('@firstDuplicatePinboardButton');

        client.waitForAlertText(function (value) {
          assert.ok(typeof (value) === 'string');
          assert.ok(value.includes('Pinboard is saving'));
        }, 5000);

        client.acceptAlert(function () {
          client.pause(500);
          client.assert.urlContains('pinboard/283fea1f/');
        });
      });

      it('should still in current page if pinboard is saving and user confirm no', function (client) {
        api.mockPut(
          '/api/v2/mobile/pinboards/5cd06f2b/', 200,
          mockData.updatePinboardCrsRequest,
          mockData.updatePinboardCrsResponse,
          10000
        );
        const pinboardsListSection = this.pinboardPage.section.pinboardsListSection;
        const crsPinnedSection = this.pinboardPage.section.pinnedSection.section.crs;
        const firstCrPinnedCard = crsPinnedSection.section.firstCard;
        firstCrPinnedCard.click('@firstCardUnpinBtn');
        client.pause(2000);
        this.pinboardPage.click('@pinboardsListButton');
        pinboardsListSection.click('@firstDuplicatePinboardButton');

        client.waitForAlertText(function (value) {
          assert.ok(typeof (value) === 'string');
          assert.ok(value.includes('Pinboard is saving'));
        }, 5000);

        client.dismissAlert(function () {
          client.pause(500);
          client.assert.urlContains('pinboard/5cd06f2b/');
        });
      });
    });
  });
});
