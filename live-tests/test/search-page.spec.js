'use strict';
var api = require(__dirname + '/../mock-api');

const mockSuggestionResponse = {
  'REPORT': [
    {
      'title': 'Molestiae impedit rerum tempora nulla aliquid eius.',
      'publish_date': '2016-11-07',
      'id': 54,
      'publication': 'dolorum'
    }
  ],
  'FAQ': [
    {
      'question': 'How accurate is the data?',
      'id': 18
    }
  ],
  'OFFICER': [
    {
      'url': 'https://beta.cpdb.co/officer/john-tobler/30291',
      'extra_info': 'Badge # 4169',
      'id': 30291,
      'name': 'John Tobler'
    }
  ]
};

const mockSearchQueryResponse = {
  'REPORT': [
    {
      'title': 'Lorem Ipsum Report',
      'publish_date': '1900-01-01',
      'id': 70,
      'publication': 'New York Times'
    }
  ],

  'FAQ': [
    {
      'question': 'Where is the glossary?',
      'id': 24
    },
    {
      'question': 'How does this interact with the IPRA Portal?',
      'id': 27
    }
  ],

  'OFFICER': [
    {
      'url': 'https://beta.cpdb.co/officer/dummy/john-wang',
      'extra_info': 'Badge # 9999',
      'id': 9876,
      'name': 'John Wang'
    }
  ]
};


describe('SearchPageTest', function () {
  it('should show search page with suggested items', function (client) {

    api.mock('GET', '/search-mobile/', 200, mockSuggestionResponse);

    client
      .url(client.globals.clientUrl)
      .waitForElementVisible('a[href="/search/"]', 10000);

    client.click('a[href="/search/"]');
    client.waitForElementVisible('.sheet', 4000);

    client.expect.element('.query-input').to.be.visible;
    client.expect.element('.query-input').to.have.attribute('placeholder', 'Search');

    client.expect.element('#search-category-suggested').text.to.equal('Suggested');

    client.expect.element('.suggested[href="/reporting/54/"]').to.be.present;
    client.expect.element('.sheet').text.to.contain('Report');
    client.expect.element('.sheet').text.to.contain('Molestiae impedit rerum tempora nulla aliquid eius.');

    client.expect.element('.suggested[href="/faq/18/"]').to.be.present;
    client.expect.element('.sheet').text.to.contain('FAQ');
    client.expect.element('.sheet').text.to.contain('How accurate is the data?');

    client.expect.element('.sheet').text.to.contain('Officer');
    client.expect.element('.sheet').text.to.contain('John Tobler');

    client.end();
  });

  it('should show recent items', function (client) {

    api.mock('GET', '/search-mobile/', 200, mockSuggestionResponse);

    client
      .url(client.globals.clientUrl)
      .waitForElementVisible('a[href="/search/"]', 10000);

    client.click('a[href="/search/"]') ;
    client.waitForElementVisible('.sheet', 4000);

    client.click('.suggested[href="/reporting/54/"]');
    // this report items should now be added into "recent" list

    client.url(client.globals.clientUrl + '/search/').waitForElementVisible('.sheet', 4000);
    client.expect.element('#search-category-recent').to.be.present;
    client.expect.element('.body.recent').text.to.contain('Molestiae impedit rerum tempora nulla aliquid eius');

    client.end();
  });

  it('should show results that match search query', function (client) {

    api.mock('GET', '/search-mobile/', 200, mockSuggestionResponse);
    api.mock('GET', '/search-mobile/wh/', 200, mockSearchQueryResponse);

    client
      .url(client.globals.clientUrl + '/search/')
      .waitForElementVisible('.sheet', 4000);

    client
      .setValue('.query-input', 'wh')
      .waitForElementVisible('#search-category-officers', 4000);

    client.expect.element('#search-category-officers').text.to.equal('Officers');
    client.expect.element('#search-category-faqs').text.to.equal('FAQ');
    client.expect.element('#search-category-reports').text.to.equal('Reports');

    client.expect
      .element('a[href="/faq/24/"]')
      .text.to.contain('Where is the glossary?');

    client.expect
      .element('a[href="/faq/27/"]')
      .text.to.contain('How does this interact with the IPRA Portal?');

    client.expect
      .element('a[href="/reporting/70/"]')
      .text.to.contain('Lorem Ipsum Report');

    client.expect
      .element('a[href="/officer/9876/"]')
      .text.to.contain('John Wang');

    client.end();
  });

  it('should empty query when clear icon is tapped', function (client) {

    api.mock('GET', '/search-mobile/', 200, mockSuggestionResponse);
    api.mock('GET', '/search-mobile/wh/', 200, mockSearchQueryResponse);

    client
      .url(client.globals.clientUrl + '/search/')
      .waitForElementVisible('.sheet', 4000);

    client
      .setValue('.query-input', 'wh')
      .waitForElementVisible('#search-category-officers', 4000);

    client.expect.element('.query-input').value.to.equal('wh');
    client.click('.clear-icon');
    client.expect.element('.query-input').value.to.equal('');

    client.end();
  });
});
