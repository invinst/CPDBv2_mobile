'use strict';
const api = require(__dirname + '/../mock-api');

const mockOfficer = {
  'full_name': 'John Doe',
  'id': 2235,
  'complaint_records': {
    facets: []
  }
};

const mockTimeline = {
  'count': 31,
  'next': `http://localhost:${api.port}/api/v2/officers/2235/timeline-items/?limit=20&offset=20/`,
  'previous': null,
  'results': [
    {
      'crs': 4,
      'kind': 'YEAR',
      'year': 2005
    },
    {
      'category': 'Use of Force',
      'kind': 'CR',
      'subcategory': 'EXCESSIVE FORCE - OFF DUTY (INCLUDES NEIGHBOR, TRAFFI',
      'crid': '309887',
      'date': '2005-11-28',
      'coaccused': 1,
      'finding': 'Unfounded'
    },
    {
      'category': 'Operation/Personnel Violations',
      'kind': 'CR',
      'subcategory': 'Miscellaneous',
      'crid': '307389',
      'date': '2005-07-29',
      'coaccused': 2,
      'finding': 'Sustained'
    },
    {
      'category': 'Operation/Personnel Violations',
      'kind': 'CR',
      'subcategory': 'NEGLECT OF DUTY/CONDUCT UNBECOMING - ON DUTY',
      'crid': '303384',
      'date': '2005-01-28',
      'coaccused': 1,
      'finding': 'Not Sustained'
    },
    {
      'category': 'Use of Force',
      'kind': 'CR',
      'subcategory': 'CIVIL SUIT - THIRD PARTY',
      'crid': '303350',
      'date': '2005-01-27',
      'coaccused': 9,
      'finding': 'Unfounded'
    },
    {
      'crs': 16,
      'kind': 'YEAR',
      'year': 2004
    },
    {
      'category': 'Illegal Search',
      'kind': 'CR',
      'subcategory': 'SEARCH OF PREMISE/VEHICLE WITHOUT WARRANT',
      'crid': '300338',
      'date': '2004-08-30',
      'coaccused': 1,
      'finding': 'Unfounded'
    },
    {
      'category': 'Use of Force',
      'kind': 'CR',
      'subcategory': 'NO ARREST',
      'crid': '300309',
      'date': '2004-08-28',
      'coaccused': 1,
      'finding': 'Not Sustained'
    },
    {
      'category': 'Illegal Search',
      'kind': 'CR',
      'subcategory': 'SEARCH OF PREMISE/VEHICLE WITHOUT WARRANT',
      'crid': '299957',
      'date': '2004-08-12',
      'coaccused': 5,
      'finding': 'Not Sustained'
    },
    {
      'category': 'Illegal Search',
      'kind': 'CR',
      'subcategory': 'SEARCH OF PREMISE/VEHICLE WITHOUT WARRANT',
      'crid': '299956',
      'date': '2004-08-12',
      'coaccused': 5,
      'finding': 'Not Sustained'
    },
    {
      'category': 'Illegal Search',
      'kind': 'CR',
      'subcategory': 'SEARCH OF PREMISE/VEHICLE WITHOUT WARRANT',
      'crid': '299780',
      'date': '2004-08-04',
      'coaccused': 5,
      'finding': 'Unfounded'
    },
    {
      'category': 'Operation/Personnel Violations',
      'kind': 'CR',
      'subcategory': 'Inventory Procedures',
      'crid': '299070',
      'date': '2004-07-03',
      'coaccused': 6,
      'finding': 'Unfounded'
    },
    {
      'category': 'Operation/Personnel Violations',
      'kind': 'CR',
      'subcategory': 'Inventory Procedures',
      'crid': '297956',
      'date': '2004-05-15',
      'coaccused': 8,
      'finding': 'Not Sustained'
    },
    {
      'category': 'Illegal Search',
      'kind': 'CR',
      'subcategory': 'SEARCH OF PREMISE/VEHICLE WITHOUT WARRANT',
      'crid': '297710',
      'date': '2004-05-06',
      'coaccused': 10,
      'finding': 'Not Sustained'
    },
    {
      'category': 'Illegal Search',
      'kind': 'CR',
      'subcategory': 'SEARCH OF PREMISE/VEHICLE WITHOUT WARRANT',
      'crid': '297694',
      'date': '2004-05-05',
      'coaccused': 9,
      'finding': 'Exonerated'
    },
    {
      'category': 'Illegal Search',
      'kind': 'CR',
      'subcategory': 'SEARCH OF PREMISE/VEHICLE WITHOUT WARRANT',
      'crid': '296868',
      'date': '2004-03-31',
      'coaccused': 10,
      'finding': 'Unfounded'
    },
    {
      'category': 'Illegal Search',
      'kind': 'CR',
      'subcategory': 'SEARCH OF PREMISE/VEHICLE WITHOUT WARRANT',
      'crid': '296847',
      'date': '2004-03-30',
      'coaccused': 5,
      'finding': 'Unfounded'
    },
    {
      'category': 'Illegal Search',
      'kind': 'CR',
      'subcategory': 'SEARCH OF PREMISE/VEHICLE WITHOUT WARRANT',
      'crid': '296259',
      'date': '2004-03-03',
      'coaccused': 4,
      'finding': 'Unfounded'
    },
    {
      'category': 'Use of Force',
      'kind': 'CR',
      'subcategory': 'ARRESTEE - DURING ARREST',
      'crid': '295973',
      'date': '2004-02-20',
      'coaccused': 1,
      'finding': 'Not Sustained'
    },
    {
      'category': 'Illegal Search',
      'kind': 'CR',
      'subcategory': 'SEARCH OF PREMISE/VEHICLE WITHOUT WARRANT',
      'crid': '295843',
      'date': '2004-02-14',
      'coaccused': 4,
      'finding': 'Exonerated'
    }
  ]
};

const mockTimelinePage2 = {
  'count': 31,
  'next': null,
  'previous': `http://localhost:${api.port}/api/v2/officers/2235/timeline-items/`,
  'results': [
    {
      'crs': 0,
      'kind': 'YEAR',
      'year': 1994
    },
    {
      'unit_name': '153',
      'kind': 'UNIT_CHANGE',
      'date': '1994-04-28'
    },
    {
      'crs': 0,
      'kind': 'YEAR',
      'year': 1993
    },
    {
      'unit_name': '007',
      'kind': 'UNIT_CHANGE',
      'date': '1993-01-07'
    },
    {
      'crs': 0,
      'kind': 'YEAR',
      'year': 1991
    },
    {
      'unit_name': '740',
      'kind': 'UNIT_CHANGE',
      'date': '1991-12-05'
    },
    {
      'crs': 0,
      'kind': 'YEAR',
      'year': 1989
    },
    {
      'unit_name': '007',
      'kind': 'UNIT_CHANGE',
      'date': '1989-11-09'
    },
    {
      'crs': 0,
      'kind': 'YEAR',
      'year': 1988
    },
    {
      'unit_name': '044',
      'kind': 'UNIT_CHANGE',
      'date': '1988-12-05'
    },
    {
      'kind': 'JOINED',
      'date': '1988-12-05'
    }
  ]
};

describe('OfficerTimeline test', function () {

  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/officers/2235/summary/', 200, mockOfficer);
    api.mock('GET', '/api/v2/officers/2235/timeline-items/', 200, mockTimeline);
    api.mock('GET', '/api/v2/officers/2235/timeline-items/?limit=20&offset=20/', 200, mockTimelinePage2);

    this.officerTimelinePage = client.page.officerTimeline();
    this.officerTimelinePage.navigate(this.officerTimelinePage.url(2235));
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should render officer name as sheet header', function (client) {
    this.officerTimelinePage.expect.element('@header').text.to.equal('John Doe');
  });

  it('should have "Timeline" navigation link marked as "active"', function () {
    this.officerTimelinePage.expect.element('@activeLink').text.to.equal('Timeline');
  });

  it('should render Yearly Stats', function () {
    const officerTimelinePage = this.officerTimelinePage;

    officerTimelinePage.expect.element('@yearlyStats2005').text.to.contain('2005');
    officerTimelinePage.expect.element('@yearlyStats2005').text.to.contain('CRs4');
    officerTimelinePage.expect.element('@yearlyStats2005').text.to.contain('TRRsUnknown');
    officerTimelinePage.expect.element('@yearlyStats2005').text.to.contain('SalaryUnknown');
  });

  it('should render CR', function () {
    const officerTimelinePage = this.officerTimelinePage;

    officerTimelinePage.expect.element('@crItem').text.to.contain('CR 309887');
    officerTimelinePage.expect.element('@crItem').text.to.contain('NOV 28, 2005');
    officerTimelinePage.expect.element('@crItem').text.to.contain('Use of Force');
    officerTimelinePage.expect.element('@crItem').text.to.contain('EXCESSIVE FORCE - OFF DUTY (INCLUDES NEIGHBOR');
    officerTimelinePage.expect.element('@crItem').text.to.contain('Unfounded');
    officerTimelinePage.expect.element('@crItem').text.to.contain('1 of 1 Coaccused');
  });

  it('should paginate and render Join Date as last item', function (client) {
    this.officerTimelinePage.expect.element('@lastItem').text.not.to.equal('Joined CPD Dec 05, 1988');
    client.execute('scrollTo(0, document.body.scrollHeight);');
    this.officerTimelinePage.expect.element('@lastItem').text.to.equal('Joined CPD Dec 05, 1988');
  });
});
