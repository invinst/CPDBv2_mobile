'use strict';

var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');
const {
  mockLandingPageCms,
  mockTopOfficersByAllegation,
  mockRecentActivities,
  mockNewDocuments,
  mockComplaintSummaries,
} = require(__dirname + '/../mock-data/main-page');
const { mockToasts } = require(__dirname + '/../mock-data/toasts');


describe('MainPageTest', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/mobile/pinboards/latest-retrieved-pinboard/?create=false', 200, {});
    api.mock('GET', '/api/v2/cms-pages/landing-page/', 200, mockLandingPageCms);
    api.mock('GET', '/api/v2/officers/top-by-allegation/', 200, mockTopOfficersByAllegation);
    api.mock('GET', '/api/v2/activity-grid/', 200, mockRecentActivities);
    api.mock('GET', '/api/v2/cr/list-by-new-document/', 200, mockNewDocuments);
    api.mock('GET', '/api/v2/cr/complaint-summaries/', 200, mockComplaintSummaries);
    api.mock('GET', '/api/v2/mobile/toast/', 200, mockToasts);

    this.mainPage = client.page.main();
    this.search = client.page.search();
    this.pinboardPage = client.page.pinboardPage();
    this.mainPage.navigate();
    this.mainPage.expect.element('@body').to.be.present;
    done();
  });

  afterEach(function (client, done) {
    api.cleanMock();
    done();
  });

  it('should show homepage with logo and navigation links', function (client) {
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
      client.assertCount(cards.selector, 2, cards.locateStrategy);
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
      api.mockPost(
        '/api/v2/mobile/pinboards/',
        201,
        undefined,
        {
          id: '5cd06f2b',
          'officer_ids': [],
          crids: [],
          'trr_ids': [],
          title: '',
          description: '',
        },
      );

      api.mockPut(
        '/api/v2/mobile/pinboards/5cd06f2b/',
        200,
        undefined,
        {
          id: '5cd06f2b',
          'officer_ids': [],
          crids: [],
          'trr_ids': [],
          title: '',
          description: '',
        },
      );

      const checkPinToast = (parentSelector, messagePrefix) => {
        //Pin item
        parentSelector.section.cards.waitForElementPresent('@pinButton');
        parentSelector.section.cards.moveToElement('@pinButton', 0, 0);
        parentSelector.section.cards.click('@pinButton');

        //Check toast
        this.mainPage.waitForElementVisible('@lastToast');
        this.mainPage.expect.element('@lastToast').text.to.equal(
          `${messagePrefix} added to pinboard`
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
          `${messagePrefix} removed from pinboard`
        ).before(TIMEOUT);

        //Go to Search Page and check for pinboard item counts
        this.mainPage.waitForElementNotVisible('@lastToast', TIMEOUT);
        this.mainPage.click('@searchLink');
        this.search.expect.element('@pinboardBar').text.to.equal('Your pinboard is empty').before(TIMEOUT);
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
      client.execute('localStorage.removeItem(\'PINBOARD_BUTTON_INTRODUCTION\')');
      client.refresh();
      this.mainPage.section.pinboardIntroduction.waitForElementPresent('@content');
      done();
    });

    it('should display Pinboard introduction on first visited', function (client) {
      this.mainPage.section.pinboardIntroduction.waitForElementPresent('@content');
    });

    it('should not display Pinboard introduction after click dismiss', function (client) {
      this.mainPage.section.pinboardIntroduction.click('@dismissButton');
      this.mainPage.section.pinboardIntroduction.waitForElementNotPresent('@content');
      client.refresh();
      this.mainPage.waitForElementPresent('@body');
      this.mainPage.section.pinboardIntroduction.waitForElementNotPresent('@content');
    });

    it('should not display Pinboard introduction after click try it', function (client) {
      this.mainPage.section.pinboardIntroduction.click('@tryItButton');
      this.pinboardPage.waitForElementPresent('@searchBar');
      this.mainPage.navigate();
      this.mainPage.waitForElementPresent('@body');
      this.mainPage.section.pinboardIntroduction.waitForElementNotPresent('@content');
    });

    it('should not display Pinboard introduction after click Pinboard button', function (client) {
      this.mainPage.section.pinboardIntroduction.click('@pinboardButton');
      this.pinboardPage.waitForElementPresent('@searchBar');
      this.mainPage.navigate();
      this.mainPage.waitForElementPresent('@body');
      this.mainPage.section.pinboardIntroduction.waitForElementNotPresent('@content');
    });
  });
});
