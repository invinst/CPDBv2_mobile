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
  it('should navigate to /reporting when user clicks on its link', function (client) {
    api.mock('GET', '/reports/', 200, {
      'count': 162,
      'next': 'http:\/\/localhost:9000\/api\/v2\/reports\/?limit=20&offset=20',
      'previous': null,
      'results': [
        mockReport
      ]
    });

    client
      .url(client.globals.clientUrl)
      .waitForElementVisible('a[href="/reporting"]', 10000);

    client.click('a[href="/reporting"]');
    client.waitForElementVisible('.sheet', 4000);

    client.expect.element('.sheet-header').to.be.visible;
    client.expect.element('.sheet-header').text.to.contain('Reporting');

    client.end();
  });

  it('should render reporting list and detail', function (client) {

    api.mock('GET', '/reports/', 200, {
      'count': 162,
      'next': 'http:\/\/localhost:9000\/api\/v2\/reports\/?limit=20&offset=20',
      'previous': null,
      'results': [
        mockReport
      ]
    });
    api.mock('GET', '/reports/215/', 200, mockReport);

    client
      .url(`${client.globals.clientUrl}/reporting`)
      .waitForElementVisible('.sheet', 4000);

    client.expect.element('.sheet-header').to.be.visible;
    client.expect.element('.sheet-header').text.to.contain('Reporting');

    client.expect.element('.reporting-item-row[href="/reporting/215"]').to.be.visible;
    client.expect.element('.reporting-item-row > .title').text.to.contain('Should appear on');
    client.expect.element('.reporting-item-row .publication').text.to.contain('The Publication');
    client.expect.element('.reporting-item-row .publish-date').text.to.contain('Nov 30, 2016');

    client.click('.reporting-item-row[href="/reporting/215"]');

    client.expect.element('.header').text.to.contain('Reporting');
    client.expect.element('.report-title').text.to.contain('Should appear on');
    client.expect.element('.metadata').text.to.contain('An Author');
    client.expect.element('.metadata').text.to.contain('The Publication');
    client.expect.element('.metadata').text.to.contain('Nov 30, 2016');


    client.end();
  });
});
