'use strict';
var api = require(__dirname + '/../mock-api');

var mockOfficer = {
  'date_of_appt': '1988-12-05',
  'gender': 'Male',
  'complaint_records': {
    'count': 68,
    'facets': [
      {
        'name': 'category',
        'entries': [
          {
            'count': 1,
            'sustained_count': 0,
            'name': 'Verbal Abuse'
          },
          {
            'count': 36,
            'sustained_count': 0,
            'name': 'Illegal Search'
          },
          {
            'count': 2,
            'sustained_count': 1,
            'name': 'Criminal Misconduct'
          },
          {
            'count': 9,
            'sustained_count': 1,
            'name': 'Use of Force'
          },
          {
            'count': 2,
            'sustained_count': 0,
            'name': 'Supervisory Responsibilities'
          },
          {
            'count': 6,
            'sustained_count': 0,
            'name': 'Unknown'
          },
          {
            'count': 1,
            'sustained_count': 0,
            'name': 'Conduct Unbecoming'
          },
          {
            'count': 6,
            'sustained_count': 2,
            'name': 'Operation/Personnel Violations'
          },
          {
            'count': 1,
            'sustained_count': 0,
            'name': 'Drug / Alcohol Abuse'
          },
          {
            'count': 4,
            'sustained_count': 0,
            'name': 'False Arrest'
          }
        ]
      },
      {
        'name': 'complainant race',
        'entries': [
          {
            'count': 68,
            'sustained_count': 4,
            'name': 'Unknown'
          }
        ]
      },
      {
        'name': 'complainant age',
        'entries': [
          {
            'count': 68,
            'sustained_count': 4,
            'name': 'Unknown'
          }
        ]
      },
      {
        'name': 'complainant gender',
        'entries': [
          {
            'count': 68,
            'sustained_count': 4,
            'name': 'Unknown'
          }
        ]
      }
    ],
    'sustained_count': 4
  },
  'rank': '',
  'race': 'White',
  'full_name': 'John Doe',
  'badge': '9999',
  'id': 2235,
  'unit': {
    'unit_name': '153',
    'id': 5,
    'description': 'District 008'
  }
};

const officer2235 = {
  'officer_id': 2235,
  'full_name': 'Kevin Osborn',
  percentiles: [
    {
      'officer_id': 2235,
      year: 2006,
      'percentile_allegation_civilian': '66.251',
      'percentile_allegation_internal': '0.023',
      'percentile_trr': '0.049',
      'percentile_allegation': '41.001',
    },
    {
      'officer_id': 1,
      year: 2007,
      'percentile_allegation_civilian': '75.065',
      'percentile_allegation_internal': '0.022',
      'percentile_trr': '0.046',
      'percentile_allegation': '31.201'
    }
  ]
};


describe('OfficerSummary test', function () {

  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/officers/2235/summary/', 200, mockOfficer);
    api.mock('GET', '/api/v2/mobile/officers/2235/', 200, officer2235);

    this.officerSummaryPage = client.page.officerSummary();
    this.officerSummaryPage.navigate(this.officerSummaryPage.url(2235));
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should render officer name as sheet header', function () {
    this.officerSummaryPage.expect.element('@header').text.to.equal('John Doe');
  });

  it('should have "Summary" navigation link marked as "active"', function () {
    this.officerSummaryPage.expect.element('@activeLink').text.to.equal('Summary');
  });

  it('should render Assignment Details', function () {
    const officerSummaryPage = this.officerSummaryPage;

    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('Unit153');
    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('RankN/A');
    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('Badge9999');
    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('SalaryN/A');
    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('RaceWhite');
    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('SexMale');
  });

  it('should render Complaints stats', function () {
    const officerSummaryPage = this.officerSummaryPage;
    const statsSection = officerSummaryPage.section.stats;

    const totalRow = statsSection.section.complaintCounts;
    totalRow.expect.element('@totalCount').text.to.equal('68 Complaint Records (CRs),');
    totalRow.expect.element('@sustainedCount').text.to.equal('4 sustained');

    // Zero value should have lower opacity
    statsSection.expect.element('@verbalAbuseRow').text.to.equal('0');
    statsSection.expect.element('@verbalAbuseRow').to.have.css('color').which.equals('rgba(255, 95, 0, 0.4)');
  });

  it('should render officer radar chart', function (client) {
    const officerSummaryPage = this.officerSummaryPage;
    const animatedRadarChart = officerSummaryPage.section.animatedRadarChart;
    const radarChart = animatedRadarChart.section.radarChart;

    officerSummaryPage.expect.section('@animatedRadarChart').to.be.present;
    animatedRadarChart.expect.section('@radarChart').to.be.present;
    radarChart.expect.element('@radarArea').to.be.present;
    radarChart.expect.element('@radarAxis').to.be.present;
    radarChart.expect.element('@radarGrid').to.be.present;
  });
});
