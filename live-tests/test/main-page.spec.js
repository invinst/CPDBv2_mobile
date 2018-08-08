'use strict';

var api = require(__dirname + '/../mock-api');

const mockLandingPageCms = {
  fields: [
    {
      name: 'navbar_title',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff82',
          text: 'Citizens Police Data Project',
          type: 'unstyled'
        }]
      }
    }
  ]
};

describe('MainPageTest', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/cms-pages/landing-page/', 200, mockLandingPageCms);
    this.mainPage = client.page.main();
    this.mainPage.navigate();
    client.waitForElementVisible('body');
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
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

    footer.expect.element('@roadmap').text.to.equal('Roadmap');
    footer.expect.element('@roadmap').to.have.attribute('href').equals('http://roadmap.cpdp.co/');

    footer.expect.element('@logo').to.have.attribute('href').equals('https://invisible.institute/introduction');
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
});
