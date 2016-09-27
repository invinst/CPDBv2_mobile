var api = require(__dirname + '/../mock-api');
var sinon = require('sinon');


describe('Landing Page', function () {
  describe('VFTG', function () {
    it('should render VFTG with information from the server', function (client) {
      api.mock('GET', '/landing-page/', 200, {
        "vftg_header": "CPDP WEEKLY",
        "vftg_date": "2016-09-07",
        "vftg_content": "Complaints against Chicago Police rarely result in discipline data shows.",
        "vftg_link": "http://www.nytimes.com/2015/11/19/us/few-complaints-against-chicago-police-result-in-discipline-data-shows.html?_r=0",
      });

      client.maximizeWindow();
      client
        .url('http://localhost:9001')
        .waitForElementVisible('body', 10000)
        .waitForElementVisible('.cpdb-logo', 10000)
        .assert.visible('.cpdb-logo')
        .assert.containsText('.cpdb-logo', 'CPDP')
        .assert.containsText('.time', '2016-09-07')
        .assert.containsText('.news', 'Complaints against Chicago Police rarely result in discipline data shows.');

    });

    it('should do the subscription if the email is correct', function (client) {
      api.mock('POST', '/vftg/', 200, {});

      client
        .url('http://localhost:9001')
        .waitForElementVisible('body', 10000)
        .assert.containsText('.btn-subscribe', 'Subscribe')
        .setValue('.email-input', 'valid@email.com')
        .click('.btn-subscribe')
        .assert.containsText('.btn-subscribe', 'Subscribed')
    });

    it('should do show the red border subscribe button in case the email is invalid', function (client) {
      api.mock('POST', '/vftg/', 400, {});

      client
        .url('http://localhost:9001')
        .waitForElementVisible('body', 10000)
        .assert.containsText('.btn-subscribe', 'Subscribe')
        .setValue('.email-input', 'invalid email')
        .click('.btn-subscribe')
        .assert.containsText('.btn-subscribe', 'Subscribe')
    });
  });
});
