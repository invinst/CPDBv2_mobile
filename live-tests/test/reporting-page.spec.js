'use strict';
var api = require(__dirname + '/../mock-api');

var mockReport = {
  'fields': [
    {
      'type': 'rich_text',
      'name': 'title',
      'value': {
        'entityMap': {},
        'blocks': [
          {
            'text': 'Should appear on',
            'entityRanges': [],
            'depth': 0,
            'key': '8hqgc',
            'type': 'unstyled',
            'inlineStyleRanges': [],
            'data': {}
          }
        ]
      }
    },
    {
      'type': 'rich_text',
      'name': 'excerpt',
      'value': {
        'entityMap': {},
        'blocks': [
          {
            'text': 'should appear on top top',
            'entityRanges': [],
            'depth': 0,
            'key': '13c7l',
            'type': 'unstyled',
            'inlineStyleRanges': [],
            'data': {}
          }
        ]
      }
    },
    {
      'type': 'string',
      'name': 'publication',
      'value': 'The Publication'
    },
    {
      'type': 'date',
      'name': 'publish_date',
      'value': '2016-11-30'
    },
    {
      'type': 'string',
      'name': 'author',
      'value': 'An Author'
    },
    {
      'type': 'rich_text',
      'name': 'article_link',
      'value': {
        'entityMap': {
          '0': {
            'type': 'LINK',
            'data': {
              'url': 'http:\/\/google.com'
            },
            'mutability': 'MUTABLE'
          }
        },
        'blocks': [
          {
            'text': 'should appear on top',
            'entityRanges': [
              {
                'length': 6,
                'key': 0,
                'offset': 7
              }
            ],
            'depth': 0,
            'key': '5p7gk',
            'type': 'unstyled',
            'inlineStyleRanges': [],
            'data': {}
          }
        ]
      }
    }
  ],
  'meta': {},
  'id': 215
};


describe('ReportingPageTest', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/reports/', 200, {
      'count': 162,
      'next': 'http:\/\/localhost:9000\/api\/v2\/reports\/?limit=20&offset=20',
      'previous': null,
      'results': [
        mockReport
      ]
    });
    api.mock('GET', '/api/v2/reports/215/', 200, mockReport);

    this.reportingPage = client.page.reporting();
    this.reportingDetailPage = client.page.reportingDetail();
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should render reporting list correctly', function (client) {
    this.reportingPage.navigate();
    this.reportingPage.expect.element('@sheetHeader').text.to.contain('Reporting');

    const reportingRow = this.reportingPage.section.reportingRow;
    reportingRow.expect.element('@title').text.to.contain('Should appear on');
    reportingRow.expect.element('@publication').text.to.contain('The Publication');
    reportingRow.expect.element('@publishDate').text.to.contain('Nov 30, 2016');
  });

  it('should navigate to reporting detail page when its link is tapped', function (client) {
    this.reportingPage.navigate();
    this.reportingPage.section.reportingRow.click();
    client.assert.urlEquals(this.reportingDetailPage.url(215));
  });

  it('should render reporting detail correctly', function (client) {
    const reportingDetailPage = this.reportingDetailPage;
    reportingDetailPage.navigate(reportingDetailPage.url(215));
    reportingDetailPage.expect.element('@header').text.to.contain('Reporting');
    reportingDetailPage.expect.element('@title').text.to.contain('Should appear on');
    reportingDetailPage.expect.element('@metadata').text.to.contain('An Author');
    reportingDetailPage.expect.element('@metadata').text.to.contain('The Publication');
    reportingDetailPage.expect.element('@metadata').text.to.contain('Nov 30, 2016');
  });
});
