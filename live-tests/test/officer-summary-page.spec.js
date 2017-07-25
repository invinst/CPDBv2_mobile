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
  'unit': '153'
};

describe('OfficerSummary test', function () {

  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/officers/2235/summary/', 200, mockOfficer);

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
    const assignmentDetailsSection = officerSummaryPage.section.assignmentDetails;

    assignmentDetailsSection.expect.element('@header').text.to.equal('Assignment Details');
    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('Unit153');
    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('RankN/A');
    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('Badge9999');
    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('SalaryN/A');
    officerSummaryPage.expect.section('@assignmentDetails').text.to.contain('Date of Apt.DEC 05, 198828 years');
  });

  it('should render Demographics', function () {
    const officerSummaryPage = this.officerSummaryPage;
    const demographicsSection = officerSummaryPage.section.assignmentDetails;

    demographicsSection.expect.element('@header').text.to.equal('Assignment Details');
    officerSummaryPage.expect.section('@demographics').text.to.contain('RaceWhite');
    officerSummaryPage.expect.section('@demographics').text.to.contain('SexMale');
  });

  it('should render Complaints stats', function () {
    const officerSummaryPage = this.officerSummaryPage;
    const statsSection = officerSummaryPage.section.stats;

    statsSection.expect.element('@header').text.to.equal('Complaints TotalSustained');

    const totalRow = statsSection.section.totalRow;
    totalRow.expect.element('@totalCount').text.to.equal('68');
    totalRow.expect.element('@sustainedCount').text.to.equal('4');
    totalRow.expect.element('@label').text.to.equal('Total');

    // Zero value should have lower opacity
    statsSection.expect.element('@verbalAbuseRow').text.to.equal('0');
    statsSection.expect.element('@verbalAbuseRow').to.have.css('color').which.equals('rgba(255, 95, 0, 0.4)');
  });
});
