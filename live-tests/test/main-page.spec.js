'use strict';

describe('MainPageTest', function () {
  it('should show homepage with logo and navigation links', function (client) {
    client
      .url('http://localhost:9001')
      .waitForElementVisible('body', 10000)
      .waitForElementVisible('.cpdb-logo', 10000);

    client.expect.element('.cpdb-logo').to.be.visible;
    client.expect.element('.cpdb-logo').text.to.contain('cpdp');

    client.expect.element('a[href="/reporting"]').to.be.visible;
    client.expect.element('a[href="/faq"]').to.be.visible;
    client.expect.element('a[href="/about"]').to.be.visible;

    client.end();
  });
});
