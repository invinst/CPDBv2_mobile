'use strict';
var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');

const pinboardData = {
  'id': '5cd06f2b',
  'title': 'Pinboard Title',
  'officer_ids': [1234],
  'crids': ['1234567'],
  'trr_ids': [1234],
  'description': 'Pinboard Description',
};

const pinboardCRsData = [
  {
    'crid': '1234567',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'most_common_category': 'Use Of Force',
  }
];

const pinboardOfficersData = [
  {
    'id': 1234,
    'full_name': 'Daryl Mack',
    'complaint_count': 10,
    'sustained_count': 0,
    'birth_year': 1975,
    'complaint_percentile': 99.3450,
    'race': 'White',
    'gender': 'Male',
    'rank': 'Police Officer',
    'percentile': {
      'percentile_trr': '12.0000',
      'percentile_allegation': '99.3450',
      'percentile_allegation_civilian': '98.4344',
      'percentile_allegation_internal': '99.7840',
      'year': 2016,
      'id': 1,
    }
  }
];

const pinboardTRRsData = [
  {
    'id': 1234,
    'trr_datetime': '2012-01-01',
    'category': 'Impact Weapon',
    'point': { 'lon': 1.0, 'lat': 1.0 },
  }
];

describe('Pinboard Page', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/pinboards/5cd06f2b/', 200, pinboardData);
    api.mock('GET', '/api/v2/pinboards/5cd06f2b/complaints/', 200, pinboardCRsData);
    api.mock('GET', '/api/v2/pinboards/5cd06f2b/officers/', 200, pinboardOfficersData);
    api.mock('GET', '/api/v2/pinboards/5cd06f2b/trrs/', 200, pinboardTRRsData);

    this.pinboardPage = client.page.pinboardPage();
    this.pinboardPage.navigate(this.pinboardPage.url('5cd06f2b'));
    client.waitForElementVisible('body', TIMEOUT);
    done();
  });

  afterEach(function (client, done) {
    api.cleanMock();
    done();
  });

  context('pinboard pinned section', function () {
    it('should render the pinned cards correctly', function (client) {
      const pinboardPage = this.pinboardPage;
      const pinnedSection = pinboardPage.section.pinnedSection;

      const officers = pinnedSection.section.officers;
      let firstCard = officers.section.firstCard;
      officers.expect.element('@title').text.to.equal('OFFICERS');
      firstCard.expect.element('@firstCardRank').text.to.equal('Police Officer');
      firstCard.expect.element('@firstCardName').text.to.equal('Daryl Mack');
      firstCard.expect.element('@firstCardCRsCount').text.to.equal('10 complaints');

      const crs = pinnedSection.section.crs;
      firstCard = crs.section.firstCard;
      crs.expect.element('@title').text.to.equal('COMPLAINTS');
      firstCard.expect.element('@firstCardDate').text.to.equal('2010-01-01');
      firstCard.expect.element('@firstCardCategory').text.to.equal('Use Of Force');

      const trrs = pinnedSection.section.trrs;
      firstCard = trrs.section.firstCard;
      trrs.expect.element('@title').text.to.equal('TACTICAL RESPONSE REPORTS');
      firstCard.expect.element('@firstCardDate').text.to.equal('2012-01-01');
      firstCard.expect.element('@firstCardCategory').text.to.equal('Impact Weapon');
    });
  });
});
