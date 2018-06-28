'use strict';
var api = require(__dirname + '/../mock-api');

const mockComplaint = {
  'most_common_category': {
    'category': 'Operation/Personnel Violations',
    'allegation_name': 'Inventory Procedures'
  },
  'summary': 'summary',
  'incident_date': '2012-04-30',
  'involvements': [
    {
      'involved_type': 'investigator',
      'full_name': 'Peter Parker'
    },
    {
      'involved_type': 'police_witness',
      'full_name': 'Patrick Boyle',
      'officer_id': 123
    }
  ],
  'complainants': [
    {
      'gender': 'Male',
      'age': 57,
      'race': 'White'
    }
  ],
  'victims': [
    {
      'gender': 'Male',
      'age': 45,
      'race': 'Black'
    }
  ],
  'crid': '1053667',
  'point': {
    'lat': 41.846749,
    'lon': -87.685141
  },
  'beat': '1034',
  'coaccused': [
    {
      'category': 'Excessive Force',
      'final_outcome': 'Unknown',
      'id': 6493,
      'final_finding': 'Sustained',
      'rank': 'Police Officer',
      'full_name': 'Donovan Markiewicz'
    },
    {
      'category': 'Excessive Force',
      'final_outcome': 'Unknown',
      'id': 234,
      'final_finding': 'Sustained',
      'rank': 'Police Officer',
      'full_name': 'John Foertsch'
    },
    {
      'category': 'Excessive Force',
      'final_outcome': 'Unknown',
      'id': 543,
      'final_finding': 'Sustained',
      'rank': 'Police Officer',
      'full_name': 'Kenneth Wojtan'
    }
  ],
  'location': '03',
  'address': '2459 WESTERN AVE, CHICAGO IL 60608'
};

describe('ComplaintPageTest', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/mobile/cr/1053667/', 200, mockComplaint);
    this.complaintPage = client.page.complaintPage();
    client.url(`${client.globals.clientUrl}/complaint/1053667/6493/`);
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should show proper header with CR title', function (client) {
    const comlaintCategory = this.complaintPage.section.complaintCategory;
    comlaintCategory.expect.element('@category').text.to.contain('Operation/Personnel Violations');
    comlaintCategory.expect.element('@subcategory').text.to.contain('Inventory Procedures');
  });

  it('should show proper coaccusals', function (client) {
    const coaccusals = this.complaintPage.section.coaccusals;
    coaccusals.expect.element('@header').text.to.contain('3 ACCUSED OFFICERS');
    coaccusals.expect.element('@showAll').to.be.visible;
    coaccusals.expect.element('@paddingBottom').not.to.be.present;

    coaccusals.click('@showAll');
    coaccusals.expect.element('@showAll').not.to.be.present;
    coaccusals.expect.element('@paddingBottom').to.be.visible;

    const firstCoaccusal = this.complaintPage.section.firstCoaccusal;
    firstCoaccusal.expect.element('@rank').text.to.contain('Police Officer');
    firstCoaccusal.expect.element('@name').text.to.contain('Donovan Markiewicz');
    firstCoaccusal.expect.element('@category').text.to.contain('Excessive Force');
    firstCoaccusal.expect.element('@findingOutcome').text.to.contain('Sustained');
  });

  it('should show proper cr info', function () {
    this.complaintPage.expect.element('@victims').text.to.contain('Black, Male, Age 45');
    this.complaintPage.expect.element('@complainants').text.to.contain('White, Male, Age 57');
    this.complaintPage.expect.element('@summary').text.to.contain('summary');
    this.complaintPage.expect.element('@investigatorTimeline').text.to.contain(
      'Apr 30, 2012\nIncident Occurs\nInvestigation Begins\nInvestigation Closed'
    );
    this.complaintPage.expect.element('@firstInvestigator').text.to.contain('Peter Parker');
  });
});
