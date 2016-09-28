var api = require(__dirname + '/../mock-api');
var sinon = require('sinon');


describe('Landing Page', function () {
  context('VFTG', function () {
    it('should render VFTG with information from the server', function (client) {
      api.mock('GET', '/landing-page/', 200, {
        'vftg_header': 'CPDP WEEKLY',
        'vftg_date': '2016-09-07',
        'vftg_content': 'Complaints against Chicago Police rarely result in discipline data shows.',
        'vftg_link': 'http://www.nytimes.com/2015/11/19/us/few-complaints-against-chicago-police-result-in-discipline-data-shows.html?_r=0',
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
        .assert.cssProperty('.btn-subscribe', 'opacity', '0.65')
        .assert.cssProperty('.btn-subscribe', 'border', '1px solid rgb(219, 219, 219)')
        .setValue('.email-input', 'another@email.com')
        .assert.containsText('.btn-subscribe', 'Subscribe');
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
        .assert.cssProperty('.btn-subscribe', 'border', '1px solid rgb(255, 0, 0)');
    });
  });

  context('About', function () {
    it('should show the About section information', function (client) {
      api.mock('GET', '/landing-page/', 200, {
        'about_header': 'About',
        'about_content': [
          {
            'type': 'paragraph',
            'value': 'The Citizens Police Data Project houses police disciplinary information obtained from the City of Chicago.'
          },
          {
            'type': 'paragraph',
            'value': 'The information and stories we have collected here are intended as a resource for public oversight. Our aim is to create a new model of accountability between officers and citizens.'
          }
        ]
      });

      client
        .url('http://localhost:9001')
        .waitForElementVisible('body', 10000)
        .assert.containsText('.about .landing-section-title', 'About')
        .assert.containsText('.about .section-description', 'The Citizens Police Data Project houses police disciplinary information obtained from the City of Chicago.')
        .assert.containsText('.about .section-description', 'The information and stories we have collected here are intended as a resource for public oversight.')
        .assert.containsText('.about .section-description', 'Our aim is to create a new model of accountability between officers and citizens.');
    });
  });

  context('Collaborate', function () {
    it('should show the Collaborate section information', function (client) {
      api.mock('GET', '/landing-page/', 200, {
        'collaborate_header': 'Collaborate with us',
        'collaborate_content': [
          {
            'type': 'paragraph',
            'value': 'We are collecting and publishing information that sheds light on police misconduct.'
          },
          {
            'type': 'paragraph',
            'value': 'If you have documents or datasets you would like to publish, please email us, or learn more.'
          }
        ]
      });

      client
        .url('http://localhost:9001')
        .waitForElementVisible('body', 10000)
        .assert.containsText('.collaborate .landing-section-title', 'Collaborate with us')
        .assert.containsText('.collaborate .section-description', 'We are collecting and publishing information that sheds light on police misconduct.')
        .assert.containsText('.collaborate .section-description', 'If you have documents or datasets you would like to publish, please ');
    });
  });

  context('FAQ', function () {
    it('should show the FAQ section information', function (client) {
      api.mock('GET', '/landing-page/', 200, {
        'faqs': [
          {
            'id': 93,
            'title': 'How accurate is the data?',
            'body': []
          },
          {
            'id': 91,
            'title': 'How current is the data?',
            'body': []
          },
          {
            'id': 95,
            'title': 'What are the Moore and Bond datasets and how do they affect the data?',
            'body': []
          }
        ],
      });

      client
        .url('http://localhost:9001')
        .waitForElementVisible('body', 10000)
        .assert.containsText('.faq-content', 'How accurate is the data?')
        .assert.containsText('.faq-content', 'How current is the data?')
        .assert.containsText('.faq-content', 'What are the Moore and Bond datasets and how do they affect the data?');
    });
  });
});
