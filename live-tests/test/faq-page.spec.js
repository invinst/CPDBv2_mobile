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
    }
  ],
  'id': 31
};

describe('FAQPageTest', function () {

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

    this.faqPage = client.page.faq();
    this.faqPage.navigate();
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should render FAQ list', function (client) {
    const faqPage = this.faqPage;
    faqPage.expect.element('@sheetHeader').text.to.contain('FAQ');
    faqPage.section.faqRow.expect.element('@question').text.to.contain('What can I type into the search box?');
  });

  it('should navigate to FAQ detail on click', function (client) {
    const faqRow = this.faqPage.section.faqRow;
    const faqDetailPage = client.page.faqDetail();

    faqRow
      .click()
      .assert.urlEquals(faqDetailPage.url(31));
  });


  it('should have sticky header', function (client) {
    // Make sure that are so many FAQ items that scrolling down is possible
    const mockResults = (new Array(50)).fill(mockFAQ)
      .map((value, index) => Object.assign({}, value, { id: index }));

    api.mock('GET', '/api/v2/faqs/', 200, {
      'count': 14,
      'next': null,
      'previous': null,
      'results': mockResults
    });

    const faqPage = client.page.faq();
    faqPage.navigate();

    client.execute('scrollTo(0, document.body.scrollHeight);');
    faqPage.expect.element('@sticky').to.have.css('position').which.equal('fixed');
    faqPage.click('@sheetHeader');
    client.pause(500);
    faqPage.expect.element('@sticky').to.be.not.present;
  });
});
