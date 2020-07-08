'use strict';

var api = require(__dirname + '/../mock-api');
const { TIMEOUT, PINBOARD_INTRODUCTION_DELAY } = require(__dirname + '/../constants');
const {
  mockLandingPageCms,
  mockTopOfficersByAllegation,
  mockRecentActivities,
  mockNewDocuments,
  mockComplaintSummaries,
} = require(__dirname + '/../mock-data/main-page');
const {
  emptyPinboard,
  emptyPinboardData,
  pinTopOfficerRequestData,
  pinRecentActivityOfficerRequestData,
  pinNewDocumentRequestData,
  pinComplaintRequestData,
} = require('../mock-data/main-page/pinboard-function');

const { mockToasts } = require(__dirname + '/../mock-data/toasts');
const { clearReduxStore } = require(__dirname + '/../utils');
const { mockGetAppConfig } = require(__dirname + '/../mock-data/app-config');


describe('MainPageTest', function () {
  beforeEach(function (client, done) {
    api.onGet('/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false').reply(200, {});
    api.onGet('/api/v2/cms-pages/landing-page/').reply(200, mockLandingPageCms);
    api.onGet('/api/v2/officers/top-by-allegation/').reply(200, mockTopOfficersByAllegation);
    api.onGet('/api/v2/activity-grid/').reply(200, mockRecentActivities);
    api.onGet('/api/v2/cr/list-by-new-document/').reply(200, mockNewDocuments);
    api.onGet('/api/v2/cr/complaint-summaries/').reply(200, mockComplaintSummaries);
    api.onGet('/api/v2/mobile/toast/').reply(200, mockToasts);
    api.onGet('/api/v2/app-config/').reply(200, mockGetAppConfig);

    this.mainPage = client.page.main();
    this.search = client.page.search();
    this.pinboardPage = client.page.pinboardPage();
    this.mainPage.navigate();
    this.mainPage.expect.element('@body').to.be.present;
    done();
  });

  it('should show homepage with logo and navigation links', function () {
    const mainPage = this.mainPage;

    mainPage.expect.element('@title').text.to.contain('Citizens Police Data Project');
    mainPage.expect.element('@searchLink').to.be.visible;
  });

  it('should navigate to Search page when user clicks on fake search box', function (client) {
    const mainPage = this.mainPage;
    const searchPage = client.page.search();

    mainPage
      .click('@searchLink')
      .assert.urlEquals(searchPage.url());
  });

  it('should show footer link and invist logo', function () {
    const footer = this.mainPage.section.footer;

    footer.expect.element('@github').text.to.equal('Github');
    footer.expect.element('@github').to.have.attribute('href').equals('https://github.com/invinst/');
    footer.expect.element('@logo').to.have.attribute('href').equals('https://invisible.institute/cpdp');
  });

  it('should open and close legal modal', function () {
    const footer = this.mainPage.section.footer;
    const legalModal = this.mainPage.section.legalModal;

    footer.click('@legal');
    legalModal.expect.element('@content').to.be.visible;
    legalModal.click('@closeButton');
    legalModal.expect.element('@content').to.not.be.present;

    footer.click('@legal');
    legalModal.expect.element('@content').to.be.visible;
    legalModal.click('@understandButton');
    legalModal.expect.element('@content').to.not.be.present;
  });

  it('should go to the landing page when the url does not match any route', function (client) {
    const mainPageUrl = this.mainPage.url();

    this.mainPage.navigate(`${mainPageUrl}url-mediator/session-builder/`);
    client.assert.urlEquals(mainPageUrl);

    this.mainPage.navigate(`${mainPageUrl}/something/really/wrong/`);
    client.assert.urlEquals(mainPageUrl);
  });

  describe('Recent Activity carousel', function () {
    it('should render correct colors for radar chart', function () {
      const officersByAllegationCards = this.mainPage.section.topOfficersByAllegation.section.cards;
      officersByAllegationCards.expect.element('@firstRadarChart').to.have.css('background-color')
        .which.equal('rgba(245, 37, 36, 1)');
      officersByAllegationCards.expect.element('@secondRadarChart').to.have.css('background-color')
        .which.equal('rgba(255, 65, 44, 1)');
      officersByAllegationCards.expect.element('@thirdRadarChart').to.have.css('background-color')
        .which.equal('rgba(255, 100, 83, 1)');
      officersByAllegationCards.expect.element('@forthRadarChart').to.have.css('background-color')
        .which.equal('rgba(244, 162, 152, 1)');
      officersByAllegationCards.expect.element('@fifthRadarChart').to.have.css('background-color')
        .which.equal('rgba(249, 211, 195, 1)');
    });

    it('should go to officer summary page when clicking on officer card', function (client) {
      const cards = this.mainPage.section.recentActivities.section.cards;
      client.assertCount(cards.selector, 2, cards.locateStrategy);
      cards.click('@firstCard');
      client.expect.url().to.match(/\/officer\/\d+\/[-a-z]+\/?$/);
    });
  });

  describe('Officers By Allegation carousel', function () {
    it('should go to officer summary page when click to card', function (client) {
      const cards = this.mainPage.section.topOfficersByAllegation.section.cards;
      client.assertCount(cards.selector, 5, cards.locateStrategy);
      cards.click('@firstCard');
      client.expect.url().to.match(/\/officer\/\d+\/[-a-z]+\/?$/);
    });
  });

  describe('Recent Document Carousel', function () {
    it('should go to cr page when click to card', function (client) {
      const cards = this.mainPage.section.newDocumentAllegations.section.cards;
      client.assertCount(cards.selector, 2, cards.locateStrategy);
      cards.click('@firstCard');
      client.assert.urlContains('/complaint/170123/');
    });
  });

  describe('Complaint Summaries Carousel', function () {
    it('should go to cr page when click to card', function (client) {
      const cards = this.mainPage.section.complaintSummaries.section.cards;
      client.assertCount(cards.selector, 2, cards.locateStrategy);
      cards.click('@firstCard');
      client.expect.url().to.match(/\/complaint\/\w+\/$/);
    });
  });

  describe('Pinboard function', function () {
    it('should display toast when pinning cards', function (client) {
      api
        .onPost('/api/v2/mobile/pinboards/', emptyPinboardData)
        .reply(201, emptyPinboard);
      api
        .onPost('/api/v2/mobile/pinboards/', pinTopOfficerRequestData)
        .reply(201, pinTopOfficerRequestData);
      api
        .onPut('/api/v2/mobile/pinboards/5cd06f2b/', pinRecentActivityOfficerRequestData)
        .reply(200, pinRecentActivityOfficerRequestData);
      api
        .onPut('/api/v2/mobile/pinboards/5cd06f2b/', pinNewDocumentRequestData)
        .reply(200, pinNewDocumentRequestData);
      api
        .onPut('/api/v2/mobile/pinboards/5cd06f2b/', pinComplaintRequestData)
        .reply(200, pinComplaintRequestData);

      const checkPinToast = (parentSelector, messagePrefix) => {
        //Pin item
        parentSelector.section.cards.waitForElementPresent('@pinButton');
        parentSelector.section.cards.moveToElement('@pinButton', 0, 0);
        parentSelector.section.cards.click('@pinButton');

        //Check toast
        this.mainPage.waitForElementVisible('@lastToast');
        this.mainPage.expect.element('@lastToast').text.to.equal(
          `${messagePrefix} added to pinboard\nGo to pinboard`
        ).before(TIMEOUT);

        //Go to Search Page and check for pinboard item counts
        this.mainPage.waitForElementNotVisible('@lastToast', TIMEOUT);
        this.mainPage.click('@searchLink');
        this.search.expect.element('@pinboardBar').text.to.equal('Pinboard (1)').before(TIMEOUT);
        client.back();

        //Unpin item
        parentSelector.section.cards.waitForElementPresent('@pinButton');
        parentSelector.section.cards.moveToElement('@pinButton', 0, 0);
        parentSelector.section.cards.click('@pinButton');

        //Check toast
        this.mainPage.waitForElementVisible('@lastToast');
        this.mainPage.expect.element('@lastToast').text.to.equal(
          `${messagePrefix} removed from pinboard\nGo to pinboard`
        ).before(TIMEOUT);

        //Go to Search Page and check for pinboard item counts
        this.mainPage.waitForElementNotVisible('@lastToast', TIMEOUT);
        this.mainPage.click('@searchLink');

        this.search.waitForElementPresent('@queryInput');
        this.search.waitForElementNotVisible('@pinboardBar', TIMEOUT);
        client.back();
      };

      checkPinToast(this.mainPage.section.topOfficersByAllegation, 'Broderick Jones');
      checkPinToast(this.mainPage.section.recentActivities, 'Broderick Jones');
      checkPinToast(this.mainPage.section.newDocumentAllegations, 'CR #170123');
      checkPinToast(this.mainPage.section.complaintSummaries, 'CR #123');
    });
  });

  it('should have clicky installed ', function (client) {
    const page = client.page.common();
    page.waitForElementPresent('@clickyScript');
    page.waitForElementPresent('@clickySiteIdsScript');
    page.waitForElementPresent('@clickyNoJavascriptGIF');
  });

  describe('Pinboard Introduction', function () {
    beforeEach(function (client, done) {
      clearReduxStore(client);
      this.mainPage.waitForElementVisible('@body');
      done();
    });

    it('should display Pinboard introduction on first visited', function () {
      this.mainPage.section.pinboardButtonIntroduction.waitForElementPresent(
        '@introductionContent',
        PINBOARD_INTRODUCTION_DELAY
      );
    });

    it('should not display Pinboard introduction after click close button', function (client) {
      this.mainPage.section.pinboardButtonIntroduction.waitForElementPresent(
        '@introductionContent',
        PINBOARD_INTRODUCTION_DELAY
      );
      this.mainPage.section.pinboardButtonIntroduction.click('@closeButton');
      client.pause(PINBOARD_INTRODUCTION_DELAY);
      this.mainPage.section.pinboardButtonIntroduction.waitForElementNotPresent('@introductionContent');
      client.refresh();
      this.mainPage.waitForElementPresent('@body');
      client.pause(PINBOARD_INTRODUCTION_DELAY);
      this.mainPage.section.pinboardButtonIntroduction.waitForElementNotPresent('@introductionContent',);
    });

    it('should not display Pinboard introduction after click try it', function (client) {
      this.mainPage.section.pinboardButtonIntroduction.waitForElementPresent(
        '@introductionContent',
        PINBOARD_INTRODUCTION_DELAY
      );
      this.mainPage.section.pinboardButtonIntroduction.click('@tryItButton');
      this.pinboardPage.waitForElementPresent('@searchBar');
      this.mainPage.navigate();
      this.mainPage.waitForElementPresent('@body');
      client.pause(PINBOARD_INTRODUCTION_DELAY);
      this.mainPage.section.pinboardButtonIntroduction.waitForElementNotPresent('@introductionContent');
    });

    it('should not display Pinboard introduction after click Pinboard button', function (client) {
      this.mainPage.section.pinboardButtonIntroduction.waitForElementPresent(
        '@introductionContent',
        PINBOARD_INTRODUCTION_DELAY
      );
      this.mainPage.section.pinboardButtonIntroduction.click('@pinboardButton');
      this.pinboardPage.waitForElementPresent('@searchBar');
      this.mainPage.navigate();
      this.mainPage.waitForElementPresent('@body');
      client.pause(PINBOARD_INTRODUCTION_DELAY);
      this.mainPage.section.pinboardButtonIntroduction.waitForElementNotPresent('@introductionContent');
    });
  });
});
