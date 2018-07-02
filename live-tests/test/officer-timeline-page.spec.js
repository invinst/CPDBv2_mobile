'use strict';
const api = require(__dirname + '/../mock-api');

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

describe('OfficerTimeline test', function () {

  beforeEach(function (client, done) {
    this.client = client;
    api.mock('GET', '/api/v2/mobile/officers/1/new-timeline-items/', 200, mockTimeline);
    this.officerTimelinePage = client.page.officerTimeline();
    this.officerTimelinePage.navigate(this.officerTimelinePage.url(1));
    done();
  });

  afterEach(function (client, done) {
    client.end(function () {
      done();
    });
  });

  it('should go to cr page when clicking on an cr timeline item', function () {
    this.officerTimelinePage.click('@crItem');
    this.officerTimelinePage.assert.urlContains('/complaint/294088/1/');
  });

  it('should go to attachment source page when clicking on the attachment thumbnail', function () {
    this.officerTimelinePage.click('@attachmentThumbnail');
    this.client.windowHandles(result => {
      const handles = result.value;
      this.client.switchWindow(handles[handles.length - 1]);
    });
    this.client.assert.urlEquals('https://www.documentcloud.org/documents/3518950-CRID-294088-CR.html');
  });

  it('should go to trr page when clicking on an trr timeline item', function () {
    this.officerTimelinePage.click('@trrItem');
    this.officerTimelinePage.assert.urlContains('/trr/1/');
  });
});
