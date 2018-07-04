'use strict';

var api = require(__dirname + '/../mock-api');


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
      'description': 'Targeted Response Unit'
    },
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
  beat: 612
};

describe('TRRPageTest', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/mobile/trr/781/', 200, mockTRR);
    this.trrPage = client.page.trrPage();
    this.trrPage.navigate(this.trrPage.url(781));
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should show proper header with TRR title force category', function () {
    this.trrPage.expect.element('@trrHeader').text.to.equal('Other');
  });

  it('should go to officer page when clicking on the officer row', function (client) {
    this.trrPage.section.officer.expect.element('@officerRow').text.to.contain('Donovan Markiewicz');
    this.trrPage.section.officer.click('@officerRow');
    client.assert.urlEquals(client.page.officerPage().url(583));
  });
});
