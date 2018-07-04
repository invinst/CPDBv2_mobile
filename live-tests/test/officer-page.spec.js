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

const mockTimeline = [
  {
    'unit_name': '007',
    kind: 'AWARD',
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '2006-03-01',
    'award_type': 'Honorable Mention'
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
        url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html',
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
        url: 'https://www.documentcloud.org/documents/3518954-CRID-299780-CR.html',
        'preview_image_url': 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
        title: 'CRID 294088 CR',
        'file_type': 'document',
      }
    ]
  },
  {
    'unit_name': '153',
    kind: 'UNIT_CHANGE',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2000-04-28'
  },
  {
    'unit_name': '044',
    kind: 'JOINED',
    'unit_description': 'Recruit Training Section',
    rank: 'Police Officer',
    date: '2000-02-05'
  }
];


describe('OfficerPage test', function () {
  beforeEach(function (client, done) {
    this.client = client;
    api.mock('GET', '/api/v2/mobile/officers/2235/', 200, officer2235);
    api.mock('GET', '/api/v2/mobile/officers/2235/new-timeline-items/', 200, mockTimeline);

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

  describe('Timeline', function () {
    beforeEach(function (client, done) {
      this.timeline = this.officerPage.section.timeline;
      done();
    });

    it('should go to cr page when clicking on an cr timeline item', function () {
      this.timeline.click('@crItem');
      this.timeline.assert.urlContains('/complaint/294088/2235/');
    });

    it('should go to attachment source page when clicking on the attachment thumbnail', function () {
      this.timeline.click('@attachmentThumbnail');
      this.client.windowHandles(result => {
        const handles = result.value;
        this.client.switchWindow(handles[handles.length - 1]);
      });
      this.client.assert.urlEquals('https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html');
    });

    it('should go to trr page when clicking on an trr timeline item', function () {
      this.timeline.click('@trrItem');
      this.timeline.assert.urlContains('/trr/1/');
    });
  });
});
