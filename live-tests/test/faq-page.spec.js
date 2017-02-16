'use strict';
var api = require(__dirname + '/../mock-api');

var mockFAQ = {
  'fields': [
    {
      'type': 'rich_text',
      'name': 'question',
      'value': {
        'entityMap': {},
        'blocks': [
          {
            'text': 'What can I type into the search box?',
            'entityRanges': [],
            'depth': 0,
            'key': 'dvuuq',
            'type': 'unstyled',
            'inlineStyleRanges': [],
            'data': {}
          }
        ]
      }
    },
    {
      'type': 'rich_text',
      'name': 'answer',
      'value': {
        'entityMap': {},
        'blocks': [
          {
            'text': 'Officer or Investigator Name or Badge Number',
            'entityRanges': [],
            'depth': 0,
            'key': 'e3u84',
            'type': 'unstyled',
            'inlineStyleRanges': [
              {
                'style': 'BOLD',
                'length': 44,
                'offset': 0
              }
            ],
            'data': {}
          },
          {
            'text': 'Miscellaneous: specific year or month, from a \'FOIA\' request,\
             whether the investigaor is \'IPRA\' or \'IAD\'',
            'entityRanges': [],
            'depth': 0,
            'key': '9i25f',
            'type': 'unstyled',
            'inlineStyleRanges': [
              {
                'style': 'BOLD',
                'length': 14,
                'offset': 0
              }
            ],
            'data': {}
          }
        ]
      }
    }
  ],
  'meta': {
    'starred': false,
    'order': 13
  },
  'id': 31
}
;


describe('FAQPageTest', function () {
  it('should navigate to /faq when user clicks on its link', function (client) {
    api.mock('GET', '/faqs/', 200, {
      'count': 14,
      'next': null,
      'previous': null,
      'results': [
        mockFAQ
      ]
    });

    client
      .url(client.globals.clientUrl)
      .waitForElementVisible('a[href="/faq"]', 10000);

    client.click('a[href="/faq"]');
    client.waitForElementVisible('.sheet', 4000);

    client.expect.element('.sheet-header').to.be.visible;
    client.expect.element('.sheet-header').text.to.contain('FAQ');

    client.end();
  });

  it('should render FAQ list and detail', function (client) {

    api.mock('GET', '/faqs/', 200, {
      'count': 14,
      'next': null,
      'previous': null,
      'results': [
        mockFAQ
      ]
    });
    api.mock('GET', '/faqs/31/', 200, mockFAQ);

    client
      .url(`${client.globals.clientUrl}/faq`)
      .waitForElementVisible('.sheet', 4000);

    client.expect.element('.sheet-header').to.be.visible;
    client.expect.element('.sheet-header').text.to.contain('FAQ');

    client.expect.element('.row[href="/faq/31"]').to.be.visible;
    client.expect.element('.row[href="/faq/31"] > .question').text.to.contain('What can I type into the search box?');

    client.click('.row[href="/faq/31"]');

    client.expect.element('.header').text.to.contain('FAQ');
    client.expect.element('.question').text.to.contain('What can I type into the search box?');
    client.expect.element('.answer').text.to.contain('Officer or Investigator Name or Badge Number');
    client.expect.element('.answer').text.to.contain('Miscellaneous: specific year or month, from a');

    client.end();
  });
});
