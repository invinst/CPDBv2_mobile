'use strict';
var api = require(__dirname + '/../mock-api');

const mockSuggestionResponse = {
  'REPORT': [
    {
      'title': 'Molestiae impedit rerum tempora nulla aliquid eius.',
      'publish_date': '2016-11-07',
      'id': 54,
      'publication': 'dolorum'
    }
  ],
  'FAQ': [
    {
      'question': 'How accurate is the data?',
      'id': 18
    }
  ],
  'OFFICER': [
    {
      'url': 'https://beta.cpdb.co/officer/john-tobler/30291',
      'extra_info': 'Badge # 4169',
      'id': 30291,
      'name': 'John Tobler'
    }
  ]
};

const mockSearchQueryResponse = {
  'REPORT': [
    {
      'title': 'Lorem Ipsum Report',
      'publish_date': '1900-01-01',
      'id': 70,
      'publication': 'New York Times'
    }
  ],

  'FAQ': [
    {
      'question': 'Where is the glossary?',
      'id': 24
    },
    {
      'question': 'How does this interact with the IPRA Portal?',
      'id': 27
    }
  ],

  'OFFICER': [
    {
      'url': 'https://beta.cpdb.co/officer/dummy/john-wang',
      'extra_info': 'Badge # 9999',
      'id': 9876,
      'name': 'John Wang'
    }
  ]
};


describe('SearchPageTest', function () {
  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/search-mobile/', 200, mockSuggestionResponse);
    api.mock('GET', '/api/v2/search-mobile/wh/', 200, mockSearchQueryResponse);
    this.searchPage = client.page.search();
    this.officerSummaryPage = client.page.officerSummary();
    this.reportingDetailPage = client.page.reportingDetail();
    this.faqDetailPage = client.page.faqDetail();
    this.searchPage.navigate();
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should show search page with suggested items', function (client) {
    const searchPage = this.searchPage;

    searchPage.expect.element('@queryInput').to.be.visible;
    searchPage.expect.element('@queryInput').to.have.attribute('placeholder', 'Search');

    searchPage.expect.element('@suggestedHeader').text.to.equal('SUGGESTED');

    const suggested = searchPage.section.suggested;

    const suggestedReport = suggested.section.report;
    const suggestedFaq = suggested.section.faq;
    const suggestedOfficer = suggested.section.officer;

    suggested.expect.section('@report').to.have.attribute('href').which.contains('/reporting/54/');
    suggestedReport.expect.element('@label').text.to.contain('Report');
    suggestedReport.expect.element('@value').text.to.contain('Molestiae impedit rerum tempora nulla aliquid eius.');

    suggested.expect.section('@faq').to.have.attribute('href').which.contains('/faq/18/');
    suggestedFaq.expect.element('@label').text.to.contain('FAQ');
    suggestedFaq.expect.element('@value').text.to.contain('How accurate is the data?');

    suggested.expect.section('@officer').to.have.attribute('href').which.contains('/officer/30291/');
    suggestedOfficer.expect.element('@label').text.to.contain('Officer');
    suggestedOfficer.expect.element('@value').text.to.contain('John Tobler');
  });

  it('should show recent items', function (client) {
    this.searchPage.section.suggested.section.report.click();
    // this report items should now be added into "recent" list
    this.searchPage.navigate();
    this.searchPage.expect.element('@recentHeader').to.be.present;
    this.searchPage.expect.section('@recent').text.to.contain('Molestiae impedit rerum tempora nulla aliquid eius');
  });

  it('should show results that match search query', function (client) {
    this.searchPage.setValue('@queryInput', 'wh');

    this.searchPage.expect.element('@officersHeader').text.to.equal('OFFICERS');
    this.searchPage.expect.element('@faqsHeader').text.to.equal('FAQ');
    this.searchPage.expect.element('@reportsHeader').text.to.equal('REPORTS');

    let officers = this.searchPage.section.officers;
    let faqs = this.searchPage.section.faqs;
    let reports = this.searchPage.section.reports;

    officers.expect.element('@row').text.to.contain('John Wang');
    faqs.expect.element('@row1').text.to.contain('Where is the glossary?');
    faqs.expect.element('@row2').text.to.contain('How does this interact with the IPRA Portal?');
    reports.expect.element('@row').text.to.contain('Lorem Ipsum Report');
  });

  it('should empty query when clear icon is tapped', function (client) {
    this.searchPage.setValue('@queryInput', 'wh');
    this.searchPage.expect.element('@queryInput').value.to.equal('wh');
    this.searchPage.click('@clearIcon');
    this.searchPage.expect.element('@queryInput').value.to.equal('');
  });

  it('should navigate to officer summary page when tapped', function (client) {
    this.searchPage.setValue('@queryInput', 'wh');
    this.searchPage.section.officers.click('@row');
    client.assert.urlEquals(this.officerSummaryPage.url(9876));
  });

  it('should navigate to report detail page when tapped', function (client) {
    this.searchPage.setValue('@queryInput', 'wh');
    this.searchPage.section.reports.click('@row');
    client.assert.urlEquals(this.reportingDetailPage.url(70));
  });

  it('should navigate to faq page when tapped', function (client) {
    this.searchPage.setValue('@queryInput', 'wh');
    this.searchPage.section.faqs.click('@row1');
    client.assert.urlEquals(this.faqDetailPage.url(24));
  });
});
