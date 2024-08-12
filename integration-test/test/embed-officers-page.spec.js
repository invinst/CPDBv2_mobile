'use strict';

// var assert = require('assert');
var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');
const { mockGetAppConfig } = require(__dirname + '/../mock-data/app-config');

const mockOfficers = [
  {
    'id': 13788,
    'full_name': 'Broderick Jones',
    'complaint_count': 104,
    'sustained_count': 11,
    'birth_year': 1971,
    'race': 'Black',
    'gender': 'Male',
    'percentile_trr': '0.0000',
    'percentile_allegation_civilian': '99.9817',
    'percentile_allegation': '99.9911',
    'percentile_allegation_internal': '87.8280',
  },
  {
    'id': 8658,
    'full_name': 'Corey Flagg',
    'complaint_count': 95,
    'sustained_count': 7,
    'birth_year': 1970,
    'race': 'Black',
    'gender': 'Male',
    'percentile_trr': '0.0000',
    'percentile_allegation_civilian': '99.9696',
    'percentile_allegation': '99.9822',
    'percentile_allegation_internal': '99.6468',
  },
];

describe('EmbedOfficerPage', function () {
  beforeEach(function (client, done) {
    api.onGet('/api/v2/mobile/officers/?ids=13788,8658').reply(200, mockOfficers);
    api.onGet('/api/v2/app-config/').reply(200, mockGetAppConfig);
    this.embedOfficersPage = client.page.embedOfficersPage();
    this.embedOfficersPage.navigate(
      this.embedOfficersPage.url('?ids=13788,8658&title=Some%20title&description=Some%20description')
    );
    this.embedOfficersPage.expect.element('@body').to.be.present;
    done();
  });

  afterEach(function (client, done) {
    done();
  });

  // it('should show title, description and officer cards and no pin buttons', function (client) {
  //   this.embedOfficersPage.expect.element('@title').text.to.equal('Some title');
  //   this.embedOfficersPage.expect.element('@description').text.to.equal('Some description');

  //   const cards = this.embedOfficersPage.section.cards;
  //   client.elements(cards.locateStrategy, cards.selector, function (result) {
  //     assert.equal(result.value.length, 2);
  //   });
  //   this.embedOfficersPage.expect.element('@firstPinButton').not.to.be.present;
  // });

  // it('should go to officer summary page when click to card', function (client) {
  //   this.embedOfficersPage.waitForElementVisible('@firstCard', TIMEOUT);
  //   this.embedOfficersPage.click('@firstCard');
  //   client.switchToRecentTab();
  //   client.assert.urlContains('/officer/13788/');
  // });

  it('should have clicky installed ', function (client) {
    const page = client.page.common();
    page.waitForElementPresent('@clickyScript');
    page.waitForElementPresent('@clickySiteIdsScript');
    page.waitForElementPresent('@clickyNoJavascriptGIF');
  });
});
