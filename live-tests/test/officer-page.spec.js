'use strict';
var api = require(__dirname + '/../mock-api');

const officer2235 = {
  'officer_id': 2235,
  'full_name': 'Kevin Osborn',
  active: true,
  'allegation_count': 104,
  badge: '8548',
  'historic_badges': ['8547', '8546'],
  'birth_year': 1957,
  'civilian_compliment_count': 4,
  'complaint_percentile': 99.895,
  'date_of_appt': '1993-12-13',
  'date_of_resignation': '2017-01-15',
  'discipline_count': 1,
  gender: 'Male',
  'honorable_mention_count': 55,
  'honorable_mention_percentile': 85.87,
  'major_award_count': 1,
  race: 'White',
  rank: 'Police Officer',
  'sustained_count': 1,
  'trr_count': 1,
  unit: {
    'unit_id': 6,
    description: 'District 005',
    'unit_name': '005',
  },
  percentiles: [
    {
      'officer_id': 2235,
      year: 2006,
      'percentile_allegation_civilian': '66.251',
      'percentile_allegation_internal': '0.023',
      'percentile_trr': '44.7',
      'percentile_allegation': '41.001',
    },
    {
      'officer_id': 2235,
      year: 2007,
      'percentile_allegation_civilian': '0.022',
      'percentile_allegation_internal': '75.065',
      'percentile_trr': '0.046',
      'percentile_allegation': '31.201'
    }
  ]
};


describe('OfficerPage test', function () {

  beforeEach(function (client, done) {
    api.mock('GET', '/api/v2/mobile/officers/2235/', 200, officer2235);

    this.officerPage = client.page.officerPage();
    this.officerPage.navigate(this.officerPage.url(2235));
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should render officer radar chart', function (client) {
    const officerPage = this.officerPage;
    const animatedRadarChart = officerPage.section.animatedRadarChart;
    const radarChart = animatedRadarChart.section.radarChart;

    officerPage.expect.section('@animatedRadarChart').to.be.present;
    animatedRadarChart.expect.section('@radarChart').to.be.present;
    radarChart.expect.element('@radarArea').to.be.present;
    radarChart.expect.element('@radarAxis').to.be.present;
    radarChart.expect.element('@radarGrid').to.be.present;
  });

  it('should render officer summary correctly', function (client) {

    const officerPage = this.officerPage;

    officerPage.expect.element('@officerName').text.to.equal('Kevin Osborn');

    const summary = officerPage.section.summary;

    summary.expect.element('@demographic').text.to.equal('60 years old, white, male.');

    summary.section.badge.expect.element('@label').text.to.equal('Badge');
    summary.section.badge.expect.element('@value').text.to.contain('8548');

    summary.section.rank.expect.element('@label').text.to.equal('Rank');
    summary.section.rank.expect.element('@value').text.to.contain('Police Officer');

    summary.section.unit.expect.element('@label').text.to.equal('Unit');
    summary.section.unit.expect.element('@value').text.to.contain('Unit 005 - District 005');

    summary.section.career.expect.element('@label').text.to.equal('Career');
    summary.section.career.expect.element('@value').text.to.contain('DEC 13, 1993 — JAN 15, 2017');

    summary.expect.element('@historicBadgesContainer').to.have.css('max-height').which.equal('0px');

    summary.click('@badgeToggle');

    summary.expect.element('@historicBadgesContainer').text.to.equal('8547, 8546');
    summary.expect.element('@historicBadgesContainer').to.have.css('max-height').which.equal('80px').after(500);
  });

  it('should render officer metrics correctly', function () {
    const officerPage = this.officerPage;
    const metrics = officerPage.section.metrics;

    const allegationItem = metrics.section.allegationItem;
    const sustainedItem = metrics.section.sustainedItem;
    const trrItem = metrics.section.trrItem;
    const complimentItem = metrics.section.complimentItem;
    const awardItem = metrics.section.awardItem;
    const honorableMentionItem = metrics.section.honorableMentionItem;

    allegationItem.expect.element('@value').text.to.equal('104');
    allegationItem.expect.element('@name').text.to.equal('Allegations');
    allegationItem.expect.element('@description').text.to.equal('More than 99.8% of other officers');

    sustainedItem.expect.element('@value').text.to.equal('1');
    sustainedItem.expect.element('@name').text.to.equal('Sustained');
    sustainedItem.expect.element('@description').text.to.equal('1 Disciplined');

    trrItem.expect.element('@value').text.to.equal('1');
    trrItem.expect.element('@name').text.to.equal('Use of Force Report');
    trrItem.expect.element('@description').text.to.equal('More than 0% of other officers');

    complimentItem.expect.element('@value').text.to.equal(4);
    complimentItem.expect.element('@name').text.to.equal('Civilian\nCompliments');

    awardItem.expect.element('@value').text.to.equal(1);
    awardItem.expect.element('@name').text.to.equal('Major Award');

    honorableMentionItem.expect.element('@value').text.to.equal('55');
    honorableMentionItem.expect.element('@name').text.to.equal('Honorable Mentions');
    honorableMentionItem.expect.element('@description').text.to.equal('More than 85% of other officers');
  });

  it('should open explainer when clicking on radar chart', function () {
    const officerPage = this.officerPage;
    const animatedRadarChart = officerPage.section.animatedRadarChart;

    officerPage.expect.section('@animatedRadarChart').to.be.present;
    animatedRadarChart.expect.section('@radarChart').to.be.present;
    animatedRadarChart.expect.element('@radarChartContainer').to.be.present;

    animatedRadarChart.click('@radarChartContainer');

    officerPage.expect.section('@triangleExplainer').to.be.present;
  });

  context('Radar chart explainer is opened', function () {
    beforeEach(function (client, done) {
      const officerPage = this.officerPage;
      const animatedRadarChart = officerPage.section.animatedRadarChart;
      officerPage.expect.section('@animatedRadarChart').to.be.present;
      animatedRadarChart.expect.section('@radarChart').to.be.present;
      animatedRadarChart.expect.element('@radarChartContainer').to.be.present;

      animatedRadarChart.click('@radarChartContainer');

      officerPage.expect.section('@triangleExplainer').to.be.present;

      const triangleExplainer = officerPage.section.triangleExplainer;
      const radarChartContainer = triangleExplainer.section.radarChartContainer;

      radarChartContainer.expect.element('@closeButton').to.be.present;
      radarChartContainer.expect.element('@radarChart').to.be.present;
      triangleExplainer.section.explainerContent.expect.element('@title').text.to.equal('What is this triangle?');

      done();
    });

    it('should be closed when clicking on the close button', function () {
      const officerPage = this.officerPage;
      const radarChartContainer = officerPage.section.triangleExplainer.section.radarChartContainer;

      radarChartContainer.click('@closeButton');

      officerPage.expect.section('@triangleExplainer').to.be.not.present;
    });

    it('should navigate between explainers when clicking in rightNav', function (client) {
      const officerPage = this.officerPage;
      const triangleExplainer = officerPage.section.triangleExplainer;

      triangleExplainer.click('@rightNav');

      const scaleExplainer = officerPage.section.scaleExplainer;
      const scaleExplainerContent = scaleExplainer.section.explainerContent;
      scaleExplainerContent.expect.element('@title').text.to.equal('What is the scale?');

      scaleExplainer.click('@rightNav');

      const percentileExplainer = officerPage.section.percentileExplainer;
      const percentileExplainerContent = percentileExplainer.section.explainerContent;
      percentileExplainerContent.expect.element('@title').text.to.equal('Cumulative Percentiles by Year');

      percentileExplainer.click('@rightNav');

      const triangleExplainerContent = officerPage.section.triangleExplainer.section.explainerContent;
      triangleExplainerContent.expect.element('@title').text.to.equal('What is this triangle?');
    });

    it('should navigate between explainers when clicking in leftNav', function () {
      const officerPage = this.officerPage;
      const triangleExplainer = officerPage.section.triangleExplainer;

      triangleExplainer.click('@leftNav');

      const percentileExplainer = officerPage.section.percentileExplainer;
      const percentileExplainerContent = percentileExplainer.section.explainerContent;
      percentileExplainerContent.expect.element('@title').text.to.equal('Cumulative Percentiles by Year');

      percentileExplainer.click('@leftNav');

      const scaleExplainer = officerPage.section.scaleExplainer;
      const scaleExplainerContent = scaleExplainer.section.explainerContent;
      scaleExplainerContent.expect.element('@title').text.to.equal('What is the scale?');

      scaleExplainer.click('@leftNav');

      const triangleExplainerContent = officerPage.section.triangleExplainer.section.explainerContent;
      triangleExplainerContent.expect.element('@title').text.to.equal('What is this triangle?');
    });

    it('should show triangleExplainer content correctly', function () {
      const officerPage = this.officerPage;
      const triangleExplainer = officerPage.section.triangleExplainer;

      triangleExplainer.expect.element('@leftNav').text.to.equal('Percentiles by year');
      triangleExplainer.expect.element('@rightNav').text.to.equal('What is the scale?');

      const descriptionContent = triangleExplainer.section.explainerContent.section.descriptionContent;

      descriptionContent.expect.element('@content').text.to.be.equal(
        'The triangle shows the percentile rank for this officer in each of three types of data: ' +
        'complaints from civilians, complaints from other police officers, and self-reported uses of force.'
      );
      descriptionContent.expect.element('@subContent').text.to.be.equal(
        'If one corner of the inner triangle is close to reaching the outer triangle,' +
        'then this officer is named in a relatively high rate of incidents of that type.'
      );
    });

    it('should show scaleExplainer content correctly', function () {
      const officerPage = this.officerPage;
      const triangleExplainer = officerPage.section.triangleExplainer;

      triangleExplainer.click('@rightNav');

      const scaleExplainer = officerPage.section.scaleExplainer;

      scaleExplainer.expect.element('@leftNav').text.to.equal('What is this triangle?');
      scaleExplainer.expect.element('@rightNav').text.to.equal('Percentiles by year');

      const descriptionContent = scaleExplainer.section.explainerContent.section.descriptionContent;

      descriptionContent.expect.element('@content').text.to.be.equal(
        'The scale is based on this officer’s percentile rank. ' +
        'This is relative to all other officers for whom data is available during the same years.'
      );
      descriptionContent.expect.element('@subContent').text.to.be.equal(
        'If an officer’s percentile rank for civilian complaints is 99% ' +
        'then this means that they were accused in more civilian complaints per year than 99 % ' +
        'of other officers for whom data is available during the same years.'
      );
    });

    it('should show percentileExplainer content correctly', function (client) {
      const officerPage = this.officerPage;
      const triangleExplainer = officerPage.section.triangleExplainer;

      triangleExplainer.click('@leftNav');

      const percentileExplainer = officerPage.section.percentileExplainer;

      percentileExplainer.expect.element('@leftNav').text.to.equal('What is the scale?');
      percentileExplainer.expect.element('@rightNav').text.to.equal('What is this triangle?');

      const percentileContent = percentileExplainer.section.explainerContent.section.percentileContent;
      const tableHeader = percentileContent.section.tableHeader;

      percentileContent.expect.section('@tableHeader').to.be.present;
      tableHeader.expect.element('@internalComplaintHeader').text.to.equal('Internal Complaints');
      tableHeader.expect.element('@civilianComplaintHeader').text.to.equal('Civilian Complaints');
      tableHeader.expect.element('@useOfForceHeader').text.to.equal('Use Of Force');

      const percentileTable = percentileContent.section.percentileTable;
      const firstRow = percentileTable.section.firstRow;
      const secondRow = percentileTable.section.secondRow;

      firstRow.expect.element('@radarChart').to.be.present;
      firstRow.expect.element('@year').text.to.equal('2007');
      firstRow.expect.element('@internalComplaint').text.to.equal('75');
      firstRow.expect.element('@civilianComplaint').text.to.equal('0');
      firstRow.expect.element('@useOfForce').text.to.equal('0');

      secondRow.expect.element('@year').text.to.equal('2006');
      secondRow.expect.element('@radarChart').to.be.present;
      secondRow.expect.element('@internalComplaint').text.to.equal('0');
      secondRow.expect.element('@civilianComplaint').text.to.equal('66');
      secondRow.expect.element('@useOfForce').text.to.equal('44');


    });
  });
});
