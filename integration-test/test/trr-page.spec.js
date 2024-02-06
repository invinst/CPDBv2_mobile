'use strict';

const api = require(__dirname + '/../mock-api');
const { mockGetAppConfig } = require(__dirname + '/../mock-data/app-config');


const mockTRR = {
  id: 781,
  officer: {
    id: 583,
    'full_name': 'Donovan Markiewicz',
    gender: 'Male',
    race: 'White',
    'appointed_date': '2005-09-26',
    'birth_year': 1973,
    'resignation_date': '',
    unit: {
      'unit_name': '253',
      'description': 'Targeted Response Unit',
    },
    'percentile_allegation': 55.6188,
    'percentile_allegation_civilian': 47.638,
    'percentile_allegation_internal': 61.1521,
    'percentile_trr': 56.6663,
  },
  'officer_in_uniform': false,
  'officer_assigned_beat': '4682E',
  'officer_on_duty': true,
  'subject_race': 'BLACK',
  'subject_gender': 'Male',
  'subject_age': 27,
  'force_category': 'Other',
  'force_types': ['Physical Force - Stunning', 'Verbal Commands', 'Member Presence'],
  'date_of_incident': '2004-04-23',
  'location_type': 'Street',
  address: '11XX 79Th St',
  beat: 612,
};

describe('TRRPageTest', function () {
  beforeEach(function (client, done) {
    api.cleanMock();
    api.mock('GET', '/api/v2/app-config/', 200, mockGetAppConfig);
    api.mock('GET', '/api/v2/mobile/trr/781/', 200, mockTRR);
    api.mockPost(
      '/api/v2/mobile/trr/781/request-document/',
      200,
      { email: 'valid@email.com' },
      { 'message': 'Thanks for subscribing.', 'trr_id': 781 }
    );
    api.mockPost(
      '/api/v2/mobile/trr/781/request-document/',
      400,
      { email: 'invalid#email.com' },
      { 'message': 'Sorry, we can not subscribe your email' }
    );
    this.trrPage = client.page.trrPage();
    this.trrPage.navigate(this.trrPage.url(781));
    this.trrPage.expect.element('@body').to.be.present;
    done();
  });

  afterEach(function (client, done) {
    done();
  });

  it('should show proper header with TRR title force category', function () {
    this.trrPage.expect.element('@trrHeader').text.to.equal('Other');
  });

  it('should go to officer page when clicking on the officer row', function (client) {
    this.trrPage.section.officer.expect.element('@officerRow').text.to.contain('Donovan Markiewicz');
    this.trrPage.section.officer.expect.element('@radarChart').to.have.css('background-color')
      .which.equal('rgba(255, 100, 83, 1)');
    this.trrPage.section.officer.click('@officerRow');
    client.assert.urlContains('/officer/583/donovan-markiewicz/');
  });

  it('should have clicky installed ', function (client) {
    const page = client.page.common();
    page.waitForElementPresent('@clickyScript');
    page.waitForElementPresent('@clickySiteIdsScript');
    page.waitForElementPresent('@clickyNoJavascriptGIF');
  });
});
