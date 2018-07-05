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

    mainPage.expect.element('@cpdbLogo').text.to.contain('Citizens Police Data Project');
    mainPage.expect.element('@searchLink').to.be.visible;
  });

  it('should navigate to Search page when user clicks on fake search box', function (client) {
    const mainPage = this.mainPage;
    const searchPage = client.page.search();

    mainPage
      .click('@searchLink')
      .assert.urlEquals(searchPage.url());
  });

  it('should show the itercom body when clicking on intercom icon', function (client) {
    const mainPage = this.mainPage;
    mainPage.expect.element('@intercomHomeScreen', 2000).to.be.not.present;

    mainPage.waitForElementVisible('@intercomOpenIcon').click('@intercomOpenIcon');
    mainPage.expect.element('@intercomHomeScreen', 2000).to.be.visible;

    mainPage.waitForElementVisible('@intercomCloseButton').click('@intercomCloseButton');
    mainPage.expect.element('@intercomHomeScreen', 2000).to.be.not.present;
  });
});
