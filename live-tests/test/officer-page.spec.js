'use strict';
var api = require(__dirname + '/../mock-api');
const { TIMEOUT } = require(__dirname + '/../constants');

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
      year: 2005,
      'percentile_allegation_civilian': '66.251',
      'percentile_allegation_internal': '0.023',
      'percentile_allegation': '41.001',
    },
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
const officerNotEnoughPercentile = {
  'officer_id': 2234,
  'full_name': 'Not Enough Percentile Officer',
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
      'percentile_trr': '44.7',
      'percentile_allegation': '41.001',
    },
    {
      'officer_id': 2235,
      year: 2007,
      'percentile_allegation_civilian': '0.022',
      'percentile_allegation_internal': '75.065',
      'percentile_allegation': '31.201'
    }
  ]
};

const mockTimeline = [
  {
    'unit_name': '007',
    kind: 'AWARD',
    'unit_description': 'District 007',
    rank: 'Detective',
    date: '2006-03-01',
    'award_type': 'Honorable Mention'
  },
  {
    'unit_name': '007',
    kind: 'RANK_CHANGE',
    'unit_description': 'District 007',
    rank: 'Detective',
    date: '2006-02-28'
  },
  {
    'trr_id': 1,
    'unit_name': '007',
    kind: 'FORCE',
    taser: true,
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2005-12-17',
    'firearm_used': false
  },
  {
    'trr_id': 2,
    'unit_name': '007',
    kind: 'FORCE',
    taser: false,
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2005-03-17',
    'firearm_used': false
  },
  {
    'unit_name': '007',
    kind: 'UNIT_CHANGE',
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2005-01-07'
  },
  {
    'trr_id': 3,
    'unit_name': '153',
    kind: 'FORCE',
    taser: false,
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2004-12-17',
    'firearm_used': true
  },
  {
    category: 'Illegal Search',
    'unit_name': '153',
    kind: 'CR',
    subcategory: 'Search Of Premise Without Warrant',
    crid: '294088',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2003-11-26',
    coaccused: 8,
    finding: 'Exonerated',
    outcome: 'No Action Taken',
    attachments: [
      {
        url: 'https://assets.documentcloud.org/documents/3518950/CRID-294088-CR.pdf',
        'preview_image_url': 'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
        title: 'CRID 294088 CR',
        'file_type': 'document',
      },
      {
        url: 'https://player.vimeo.com/video/165206078',
        title: 'Video Clip',
        'file_type': 'video',
      },
      {
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/262463136&amp',
        title: 'Audio Clip',
        'file_type': 'audio',
      }
    ]
  },
  {
    category: 'Criminal Misconduct',
    'unit_name': '153',
    kind: 'CR',
    subcategory: 'Theft',
    crid: '260131',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2003-02-17',
    coaccused: 4,
    finding: 'Unfounded',
    outcome: 'No Action Taken',
    attachments: [
      {
        url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/262463125&amp',
        title: 'Audio Clip',
        'file_type': 'audio',
      },
      {
        url: 'https://player.vimeo.com/video/165213573',
        title: 'Video Clip',
        'file_type': 'video',
      },
      {
        url: 'https://assets.documentcloud.org/documents/3518954/CRID-299780-CR.pdf',
        'preview_image_url': 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
        title: 'CRID 294088 CR',
        'file_type': 'document',
      }
    ]
  },
  {
    'unit_name': '153',
    kind: 'RANK_CHANGE',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2000-04-28'
  },
  {
    'unit_name': '153',
    kind: 'UNIT_CHANGE',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2000-04-28'
  },
  {
    kind: 'JOINED',
    'unit_description': 'Recruit Training Section',
    date: '2000-02-05'
  }
];

const mockCoaccusals = [
  {
    id: 27778,
    'full_name': 'Carl Suchocki',
    rank: 'Police Officer',
    percentile: {
      'percentile_trr': '49.1036',
      'percentile_allegation_civilian': '99.2525',
      'percentile_allegation_internal': '79.9133'
    },
    'coaccusal_count': 47
  },
];

const mockOfficerPageCms = {
  fields: [
    {
      name: 'triangle_description',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff83',
          text: 'The corners of the triangle show the percentile score for this officer ' +
            'in each of three types of data: complaints from civilians, complaints from other officers, ' +
            'and self-reported uses of force.',
          type: 'unstyled'
        }]
      },
    },
    {
      name: 'triangle_sub_description',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff84',
          text: 'If one corner of the black inner triangle is close to reaching the outer triangle, ' +
            'then this officer is named in a relatively high rate ' +
            'of incidents of that type compared with other officers.',
          type: 'unstyled'
        }]
      },
    },
    {
      name: 'scale_description',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff85',
          text: 'If an officer’s percentile rank for civilian complaints is 99% ' +
            'then this means that they were accused in more civilian complaints per year than 99% of other officers.',
          type: 'unstyled'
        }]
      },
    },
    {
      name: 'scale_sub_description',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff82',
          text: 'Civilian and internal complaint percentiles are based on data that is only available since 2000, ' +
            'use of force data is only available since 2004. ' +
            'The overall allegation count percentiles displayed on the officer profile page ' +
            'are calculated using data that reaches back to 1988.',
          type: 'unstyled'
        }]
      },
    },
    {
      name: 'no_data_explain_text',
      type: 'rich_text',
      value: {
        entityMap: {},
        blocks: [{
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '2ff86',
          text: 'There is not enough data to construct a radar graph for this officer.',
          type: 'unstyled'
        }]
      },
    }
  ]
};

describe('OfficerPage test', function () {
  afterEach(function (client, done) {
    done();
  });

  describe('OfficerPage not enough data for radar chart', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/cms-pages/officer-page/', 200, mockOfficerPageCms);
      api.mock('GET', '/api/v2/mobile/officers/2234/', 200, officerNotEnoughPercentile);

      this.officerPage = client.page.officerPage();
      this.officerPage.navigate(this.officerPage.url(2234));
      client.waitForElementVisible('body', TIMEOUT);
      done();
    });

    it('should render officer no data radar chart', function () {
      const officerPage = this.officerPage;
      const radarChart = officerPage.section.animatedRadarChart;

      radarChart.expect.element('@noDataText').text.to.equal(
        'There is not enough data to construct a radar graph for this officer.'
      );
    });
  });

  describe('OfficerPage has radar chart', function () {
    beforeEach(function (client, done) {
      api.mock('GET', '/api/v2/cms-pages/officer-page/', 200, mockOfficerPageCms);
      api.mock('GET', '/api/v2/mobile/officers/2235/', 200, officer2235);
      api.mock('GET', '/api/v2/mobile/officers/2234/', 200, officerNotEnoughPercentile);
      api.mock('GET', '/api/v2/mobile/officers/2235/new-timeline-items/', 200, mockTimeline);
      api.mock('GET', '/api/v2/mobile/officers/2235/coaccusals/', 200, mockCoaccusals);

      this.officerPage = client.page.officerPage();
      this.officerPage.navigate(this.officerPage.url(2235));
      done();
    });

    it('should redirect to correct path name when only officer id is provided', function (client) {
      client.assert.urlContains('/officer/2235/kevin-osborn/');
    });

    it('should redirect to correct path name when the officer name is incorrect', function (client) {
      client.url('/officer/2235/somethingwrong/');
      client.waitForElementVisible('body', TIMEOUT);
      client.assert.urlContains('/officer/2235/kevin-osborn/');
    });

    it('should render officer radar chart', function () {
      const officerPage = this.officerPage;
      const animatedRadarChart = officerPage.section.animatedRadarChart;
      const radarChart = animatedRadarChart.section.radarChart;

      officerPage.expect.section('@animatedRadarChart').to.be.present;
      animatedRadarChart.expect.section('@radarChart').to.be.present;
      radarChart.expect.element('@radarArea').to.be.present;
      radarChart.expect.element('@radarAxis').to.be.present;
      radarChart.expect.element('@radarGrid').to.be.present;
    });

    it('should render officer summary correctly', function () {
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
          'The corners of the triangle show the percentile score for this officer in each of three types of data: ' +
          'complaints from civilians, complaints from other officers, and self-reported uses of force.'
        );
        descriptionContent.expect.element('@subContent').text.to.be.equal(
          'If one corner of the black inner triangle is close to reaching the outer triangle, ' +
          'then this officer is named in a relatively high rate ' +
          'of incidents of that type compared with other officers.'
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
          'If an officer’s percentile rank for civilian complaints is 99% ' +
          'then this means that they were accused in more civilian complaints per year than 99% of other officers.'
        );
        descriptionContent.expect.element('@subContent').text.to.be.equal(
          'Civilian and internal complaint percentiles are based on data that is only available since 2000, ' +
          'use of force data is only available since 2004. ' +
          'The overall allegation count percentiles displayed on the officer profile page ' +
          'are calculated using data that reaches back to 1988.'
        );
      });

      it('should show percentileExplainer content correctly', function () {
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
        const thirdRow = percentileTable.section.thirdRow;

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

        thirdRow.expect.element('@year').text.to.equal('2005');
        thirdRow.expect.element('@radarChart').to.have.css('background-color').which.equal('rgba(118, 118, 118, 1)');
        thirdRow.expect.element('@internalComplaint').text.to.equal('0');
        thirdRow.expect.element('@civilianComplaint').text.to.equal('66');
        thirdRow.expect.element('@useOfForce').text.to.equal('NaN');
      });
    });

    describe('Timeline', function () {
      beforeEach(function (client, done) {
        this.timeline = this.officerPage.section.timeline;
        done();
      });

      it('should render rank change and unit change', function (client) {
        const firstUnitChange = this.timeline.section.firstUnitChangeItem;
        const secondUnitChange = this.timeline.section.secondUnitChangeItem;
        const firstRankChange = this.timeline.section.firstRankChangeItem;
        const secondRankChange = this.timeline.section.secondRankChangeItem;
        firstUnitChange.expect.element('@unitChange').text.to.equal('Unit 153 → Unit 007 - District 007');
        firstUnitChange.expect.element('@date').text.to.equal('JAN 7');
        secondUnitChange.expect.element('@unitChange').text.to.equal('Unassigned → Unit 153 - Mobile Strike Force');
        secondUnitChange.expect.element('@date').text.to.equal('APR 28');

        firstRankChange.expect.element('@rankChange').text.to.equal('Police Officer → Detective');
        firstRankChange.expect.element('@date').text.to.equal('FEB 28');
        secondRankChange.expect.element('@rankChange').text.to.equal('Unassigned → Police Officer');
        secondRankChange.expect.element('@date').text.to.equal('APR 28');
      });

      it('should go to cr page when clicking on an cr timeline item', function () {
        this.timeline.click('@crItem');
        this.timeline.assert.urlContains('/complaint/294088/');
      });

      it('should go to attachment source page when clicking on the attachment thumbnail', function (client) {
        this.timeline.click('@attachmentThumbnail');
        client.switchToRecentTab();
        this.timeline.assert.urlEquals('https://assets.documentcloud.org/documents/3518950/CRID-294088-CR.pdf');
      });

      it('should go to trr page when clicking on an trr timeline item', function () {
        this.timeline.click('@trrItem');
        this.timeline.assert.urlContains('/trr/1/');
      });
    });

    describe('Coaccusals', function () {
      beforeEach(function (client, done) {
        this.coaccusals = this.officerPage.section.coaccusals;
        done();
      });

      it('should navigate to officer page when clicking on coaccusals card', function (client) {
        this.officerPage.click('@coaccusalsTabButton');
        this.coaccusals.assert.urlContains('/officer/2235/kevin-osborn/coaccusals/');

        this.coaccusals.click('@firstCoaccusalCard');

        this.coaccusals.assert.urlContains('/officer/27778/carl-suchocki/');
      });

      it('should be able to be accessed directly via url', function () {
        this.officerPage.navigate(this.officerPage.url(2235, 'coaccusals'));
        this.coaccusals.assert.urlContains('/officer/2235/kevin-osborn/coaccusals/');
      });
    });

    describe('Attachments', function () {
      beforeEach(function (client, done) {
        this.attachments = this.officerPage.section.attachments;
        done();
      });

      it('should navigate to officer complaint when clicking on complaint header', function () {
        this.officerPage.click('@attachmentsTabButton');
        this.attachments.assert.urlContains('/officer/2235/kevin-osborn/documents/');
        this.attachments.section.firstComplaint.waitForElementVisible('@heading', TIMEOUT);
        this.attachments.section.firstComplaint.click('@heading');
        this.attachments.assert.urlContains('/complaint/294088/');
      });

      it('should go to attachment source page when clicking on the attachment', function (client) {
        this.officerPage.click('@attachmentsTabButton');
        this.attachments.assert.urlContains('/officer/2235/kevin-osborn/documents/');
        this.attachments.section.firstComplaint.click('@firstAttachment');
        client.switchToRecentTab();
        client.assert.urlEquals(
          'https://assets.documentcloud.org/documents/3518950/CRID-294088-CR.pdf'
        );
      });

      it('should be able to be accessed directly via url', function () {
        this.officerPage.navigate(this.officerPage.url(2235, 'documents'));
        this.attachments.assert.urlContains('/officer/2235/kevin-osborn/documents/');
      });
    });
  });
});
