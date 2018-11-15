'use strict';

var assert = require('assert');
var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');

const mockOfficers = [
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
      'percentile_allegation_internal': '87.8280'
    }
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
      'percentile_allegation_internal': '99.6468'
    }
  },
];

describe('EmbedOfficerPage', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/mobile/officers/?ids=13788,8658', 200, mockOfficers);
    this.embedOfficersPage = client.page.embedOfficersPage();
    this.embedOfficersPage.navigate(
      this.embedOfficersPage.url('?ids=13788,8658&title=Some%20title&description=Some%20description')
    );
    client.waitForElementVisible('body', TIMEOUT);
    done();
  });

  afterEach(function (client, done) {
    done();
  });

  it('should show title, description and officer cards', function (client) {
    this.embedOfficersPage.expect.element('@title').text.to.equal('Some title');
    this.embedOfficersPage.expect.element('@description').text.to.equal('Some description');

    const cards = this.embedOfficersPage.section.cards;
    client.elements(cards.locateStrategy, cards.selector, function (result) {
      assert.equal(result.value.length, 2);
    });
  });

  it('should go to officer summary page when click to card', function (client) {
    this.embedOfficersPage.click('@firstCard');
    client.switchToRecentTab();
    this.embedOfficersPage.assert.urlContains('/officer/13788/');
  });
});
