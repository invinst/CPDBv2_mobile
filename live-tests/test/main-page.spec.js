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

  it('should show footer link and invist logo', function () {
    const footer = this.mainPage.section.footer;

    footer.expect.element('@github').text.to.equal('Github');
    footer.expect.element('@github').to.have.attribute('href').equals('https://github.com/invinst/');

    footer.expect.element('@roadmap').text.to.equal('Roadmap');
    footer.expect.element('@roadmap').to.have.attribute('href').equals('http://roadmap.cpdp.co/');

    footer.expect.element('@logo').to.have.attribute('href').equals('https://invisible.institute/introduction');
  });
});
