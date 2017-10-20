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
             whether the investigaor is \'IPRA\' or \'IAD\' '.repeat(100),
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
};


describe('FAQDetailPage test', function () {

  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/faqs/', 200, {
      'count': 14,
      'next': null,
      'previous': null,
      'results': [
        mockFAQ
      ]
    });
    api.mock('GET', '/api/v2/faqs/31/', 200, mockFAQ);

    this.faqDetailPage = client.page.faqDetail();
    this.faqDetailPage.navigate(this.faqDetailPage.url(31));
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should render FAQ detail', function (client) {
    this.faqDetailPage.expect.element('@header').text.to.contain('FAQ');
    this.faqDetailPage.expect.element('@question').text.to.contain('What can I type into the search box?');
    this.faqDetailPage.expect.element('@answer').text.to.contain('Officer or Investigator Name or Badge Number');
    this.faqDetailPage.expect.element('@answer').text.to.contain('Miscellaneous: specific year or month, from a');
  });

  it('should have header', function (client) {
    this.faqDetailPage.expect.element('@sheetHeader').text.to.equal('FAQ');
  });
});
