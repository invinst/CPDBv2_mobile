'use strict';

describe('MainPageTest', function () {
  beforeEach(function (client, done) {
    this.mainPage = client.page.main();
    this.mainPage.navigate();
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should show homepage with logo and navigation links', function (client) {
    const mainPage = this.mainPage;

    mainPage.expect.element('@cpdbLogo').text.to.contain('cpdp');

    mainPage.expect.element('@reportingLink').to.be.visible;
    mainPage.expect.element('@faqLink').to.be.visible;
    mainPage.expect.element('@aboutLink').to.be.visible;
    mainPage.expect.element('@searchLink').to.be.visible;
  });

  it('should navigate to FAQ page when user clicks on its link', function (client) {
    const mainPage = this.mainPage;
    const faqPage = client.page.faq();

    mainPage
      .click('@faqLink')
      .assert.urlEquals(faqPage.url());
  });

  it('should navigate to Reporting page when user clicks on its link', function (client) {
    const mainPage = this.mainPage;
    const reportingPage = client.page.reporting();

    mainPage
      .click('@reportingLink')
      .assert.urlEquals(reportingPage.url());
  });
});
