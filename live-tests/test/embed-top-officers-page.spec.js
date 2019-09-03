'use strict';

const assert = require('assert');
const api = require(__dirname + '/../mock-api');

const mockLandingPageCms = {
  fields: [
    {
      'type': 'rich_text',
      'name': 'carousel_allegation_title',
      'value': {
        'entityMap': {},
        'blocks': [
          {
            'text': 'The 1%',
            'entityRanges': [],
            'depth': 0,
            'key': '0f97e',
            'type': 'unstyled',
            'inlineStyleRanges': [],
            'data': {},
          },
        ],
      },
    },
    {
      'type': 'rich_text',
      'name': 'carousel_allegation_desc',
      'value': {
        'entityMap': {},
        'blocks': [
          {
            'text': 'Officers with a higher complaint rate than 99% of the rest of the police force',
            'entityRanges': [],
            'depth': 0,
            'key': '1eda3',
            'type': 'unstyled',
            'inlineStyleRanges': [],
            'data': {},
          },
        ],
      },
    },
  ],
};

const mockTopByAllegation = [
  {
    'id': 13788,
    'full_name': 'Broderick Jones',
    'complaint_count': 104,
    'sustained_count': 11,
    'birth_year': 1971,
    'complaint_percentile': 99.9911,
    'race': 'Black',
    'gender': 'Male',
    'percentile': {
      'percentile_trr': '0.0000',
      'percentile_allegation_civilian': '99.9817',
      'percentile_allegation': '99.9911',
      'year': 2005,
      'id': 13788,
      'percentile_allegation_internal': '87.8280',
    },
  },
  {
    'id': 8658,
    'full_name': 'Corey Flagg',
    'complaint_count': 95,
    'sustained_count': 7,
    'birth_year': 1970,
    'complaint_percentile': 99.9822,
    'race': 'Black',
    'gender': 'Male',
    'percentile': {
      'percentile_trr': '0.0000',
      'percentile_allegation_civilian': '99.9696',
      'percentile_allegation': '99.9822',
      'year': 2005,
      'id': 8658,
      'percentile_allegation_internal': '99.6468',
    },
  },
];

describe('EmbedTopOfficerPage', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/cms-pages/landing-page/', 200, mockLandingPageCms);
    api.mock('GET', '/api/v2/officers/top-by-allegation/', 200, mockTopByAllegation);
    this.embedTopOfficersPage = client.page.embedTopOfficersPage();
    this.embedTopOfficersPage.navigate();
    this.embedTopOfficersPage.expect.element('@body').to.be.present;
    done();
  });

  afterEach(function (client, done) {
    done();
  });

  it('should show officer cards', function (client) {
    const cards = this.embedTopOfficersPage.section.cards;
    client.elements(cards.locateStrategy, cards.selector, function (result) {
      assert.equal(result.value.length, 2);
    });
  });

  it('should go to officer summary page when click to card', function (client) {
    this.embedTopOfficersPage.click('@firstCard');
    client.switchToRecentTab();
    this.embedTopOfficersPage.assert.urlContains('/officer/13788/broderick-jones/');
  });
});
