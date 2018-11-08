import {
  attachmentsTransform,
  awardTransform,
  baseTransform,
  crTransform,
  fillUnitChange,
  fillYears,
  gapYearItems,
  getNewTimelineItems,
  trrTransform,
  yearItem,
  fillRankChange,
  isTimelineSuccess
} from 'selectors/officer-page/timeline';


describe('Officer new timeline selectors', function () {
  describe('baseTransform', function () {
    it('should return correct item', function () {
      const item = {
        date: '1988-12-05',
        kind: 'JOINED',
        rank: 'Police Officer',
        'unit_description': 'Recruit Training Section',
        'unit_name': '044',
      };
      baseTransform(item, 1).should.eql({
        year: 1988,
        date: 'DEC 5',
        kind: 'JOINED',
        rank: 'Police Officer',
        unitName: 'Unit 044',
        unitDescription: 'Recruit Training Section',
        key: 1,
      });
    });

    it('should mark unitName as Unassigned if it is empty', function () {
      const item = {
        date: '1988-12-05',
        kind: 'JOINED',
        rank: 'Police Officer',
        'unit_description': '',
        'unit_name': '',
      };
      baseTransform(item, 1).should.eql({
        year: 1988,
        date: 'DEC 5',
        kind: 'JOINED',
        rank: 'Police Officer',
        unitName: 'Unassigned',
        unitDescription: '',
        key: 1,
      });
    });
  });

  describe('attachmentsTransform', function () {
    it('should return correct transformed attachments', function () {
      const attachments = [
        {
          title: 'CRID 1004717 CR',
          url: 'https://www.documentcloud.org/documents/3518956-CRID-1004717-CR.pdf',
          'preview_image_url': 'https://assets.documentcloud.org/documents/3518956/pages/CRID-1004717-CR-p1-normal.gif',
          'file_type': 'document',
        },
        {
          title: 'CRID 303350 CR',
          url: 'https://www.documentcloud.org/documents/3518955-CRID-303350-CR.pdf',
          'preview_image_url': 'https://assets.documentcloud.org/documents/3518955/pages/CRID-303350-CR-p1-normal.gif',
          'file_type': 'document',
        },
        {
          title: 'Audio Clip',
          url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/262463136&amp',
          'preview_image_url': null,
          'file_type': 'audio',
        },
        {
          title: 'Video Clip',
          url: 'https://player.vimeo.com/video/165206070',
          'preview_image_url': null,
          'file_type': 'video',
        },
      ];
      attachmentsTransform(attachments).should.eql([
        {
          title: 'CRID 1004717 CR',
          url: 'https://www.documentcloud.org/documents/3518956-CRID-1004717-CR.pdf',
          previewImageUrl: 'https://assets.documentcloud.org/documents/3518956/pages/CRID-1004717-CR-p1-normal.gif',
          fileType: 'document',
        },
        {
          title: 'CRID 303350 CR',
          url: 'https://www.documentcloud.org/documents/3518955-CRID-303350-CR.pdf',
          previewImageUrl: 'https://assets.documentcloud.org/documents/3518955/pages/CRID-303350-CR-p1-normal.gif',
          fileType: 'document',
        },
        {
          title: 'Audio Clip',
          url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/262463136&amp',
          previewImageUrl: '/img/ic-audio.svg',
          fileType: 'audio',
        },
        {
          title: 'Video Clip',
          url: 'https://player.vimeo.com/video/165206070',
          previewImageUrl: '/img/ic-video.svg',
          fileType: 'video',
        },
      ]);
    });

    it('should return empty array when taking in no attachments', function () {
      attachmentsTransform(undefined).should.eql([]);
    });
  });

  describe('crTransform', function () {
    it('should return correct cr item', function () {
      const crItem = {
        category: 'Use Of Force',
        coaccused: 9,
        crid: '303350',
        date: '2005-01-27',
        finding: 'Unfounded',
        kind: 'CR',
        outcome: 'No Action Taken',
        rank: 'Police Officer',
        subcategory: 'Unnecessary Display Of Weapon / Off Duty',
        'unit_description': 'Mobile Strike Force',
        'unit_name': '153',
        attachments: [
          {
            title: 'CRID 1004717 CR',
            url: 'https://www.documentcloud.org/documents/3518956-CRID-1004717-CR.pdf',
            'preview_image_url': 'https://assets.documentcloud.org/documents/3518956/pages/CRID-1004717-CR-p1.gif',
            'file_type': 'document',
          },
          {
            title: 'CRID 303350 CR',
            url: 'https://www.documentcloud.org/documents/3518955-CRID-303350-CR.pdf',
            'preview_image_url': 'https://assets.documentcloud.org/documents/3518955/pages/CRID-303350-CR-p1.gif',
            'file_type': 'document',
          }
        ]
      };

      crTransform(crItem, 1).should.eql({
        year: 2005,
        date: 'JAN 27',
        kind: 'CR',
        rank: 'Police Officer',
        unitName: 'Unit 153',
        unitDescription: 'Mobile Strike Force',
        category: 'Use Of Force',
        crid: '303350',
        finding: 'Unfounded',
        outcome: 'No Action Taken',
        key: 1,
        attachments: [
          {
            title: 'CRID 1004717 CR',
            url: 'https://www.documentcloud.org/documents/3518956-CRID-1004717-CR.pdf',
            previewImageUrl: 'https://assets.documentcloud.org/documents/3518956/pages/CRID-1004717-CR-p1.gif',
            fileType: 'document',
          },
          {
            title: 'CRID 303350 CR',
            url: 'https://www.documentcloud.org/documents/3518955-CRID-303350-CR.pdf',
            previewImageUrl: 'https://assets.documentcloud.org/documents/3518955/pages/CRID-303350-CR-p1.gif',
            fileType: 'document',
          }
        ]
      });
    });
  });

  describe('trrTransform', function () {
    it('should transform to correct category', function () {
      const firearmItem = {
        'trr_id': 1,
        date: '2004-12-17',
        'firearm_used': true,
        kind: 'FORCE',
        rank: 'Police Officer',
        taser: false,
        'unit_description': 'Mobile Strike Force',
        'unit_name': '153',
      };
      const taserItem = {
        'trr_id': 2,
        date: '2004-12-17',
        'firearm_used': false,
        kind: 'FORCE',
        rank: 'Police Officer',
        taser: true,
        'unit_description': 'Mobile Strike Force',
        'unit_name': '153',
      };
      const trrItem = {
        'trr_id': 3,
        date: '2004-12-17',
        'firearm_used': false,
        kind: 'FORCE',
        rank: 'Police Officer',
        taser: false,
        'unit_description': 'Mobile Strike Force',
        'unit_name': '153',
      };

      trrTransform(firearmItem, 1).should.eql({
        trrId: 1,
        year: 2004,
        date: 'DEC 17',
        kind: 'FORCE',
        rank: 'Police Officer',
        unitName: 'Unit 153',
        unitDescription: 'Mobile Strike Force',
        category: 'Firearm',
        key: 1,
      });
      trrTransform(taserItem, 1).should.eql({
        trrId: 2,
        year: 2004,
        date: 'DEC 17',
        kind: 'FORCE',
        rank: 'Police Officer',
        unitName: 'Unit 153',
        unitDescription: 'Mobile Strike Force',
        category: 'Taser',
        key: 1,
      });
      trrTransform(trrItem, 1).should.eql({
        trrId: 3,
        year: 2004,
        date: 'DEC 17',
        kind: 'FORCE',
        rank: 'Police Officer',
        unitName: 'Unit 153',
        unitDescription: 'Mobile Strike Force',
        category: 'Use of Force Report',
        key: 1,
      });
    });
  });

  describe('awardTransform', function () {
    it('should map award_type to category', function () {
      const awardItem = {
        'award_type': 'Honorable Mention',
        date: '2011-03-01',
        kind: 'AWARD',
        rank: 'Police Officer',
        'unit_description': 'Mobile Strike Force',
        'unit_name': '153',
      };

      awardTransform(awardItem, 1).should.eql({
        year: 2011,
        date: 'MAR 1',
        kind: 'AWARD',
        rank: 'Police Officer',
        unitName: 'Unit 153',
        unitDescription: 'Mobile Strike Force',
        category: 'Honorable Mention',
        key: 1,
      });
    });
  });

  describe('yearItem', function () {
    it('should copy unit and rank info from baseItem', function () {
      const baseItem = {
        year: 2011,
        date: 'MAR 1',
        kind: 'AWARD',
        rank: 'Police Officer',
        unitName: '153',
        unitDescription: 'Mobile Strike Force',
        isCurrentUnit: true,
        key: 1,
      };

      yearItem(baseItem, 2010, true).should.eql({
        date: '2010',
        kind: 'YEAR',
        hasData: true,
        key: '1-YEAR-2010',
      });
    });
  });

  describe('gapYearItems', function () {
    it('should return correct year items', function () {
      const fromItem = {
        year: 2014,
        date: 'MAR 1',
        kind: 'AWARD',
        rank: 'Some Officer',
        unitName: 'Unit 111',
        unitDescription: 'Some Force',
        isCurrentUnit: true,
        key: 1,
      };
      const toItem = {
        year: 2011,
        date: 'MAR 1',
        kind: 'AWARD',
        rank: 'Police Officer',
        unitName: 'Unit 153',
        unitDescription: 'Mobile Strike Force',
        isCurrentUnit: false,
        key: 2,
      };

      gapYearItems(fromItem, toItem).should.eql([
        {
          kind: 'YEAR',
          date: '2013',
          hasData: false,
          key: '2-YEAR-2013',
        },
        {
          kind: 'YEAR',
          date: '2012',
          hasData: false,
          key: '2-YEAR-2012',
        }
      ]);
    });
  });

  describe('fillYears', function () {
    it('should fill year items into correct indexes', function () {
      const items = [
        {
          year: 2014,
          date: 'MAR 1',
          kind: 'AWARD',
          rank: 'Some Officer',
          unitName: 'Unit 111',
          unitDescription: 'Some Force',
          isCurrentUnit: true,
          key: 1,
        },
        {
          year: 2011,
          date: 'MAR 1',
          kind: 'AWARD',
          rank: 'Police Officer',
          unitName: 'Unit 153',
          unitDescription: 'Mobile Strike Force',
          isCurrentUnit: false,
          key: 2,
        }
      ];

      fillYears(items).should.eql([
        {
          kind: 'YEAR',
          date: '2014',
          hasData: true,
          key: '1-YEAR-2014',
        },
        {
          year: 2014,
          date: 'MAR 1',
          kind: 'AWARD',
          rank: 'Some Officer',
          unitName: 'Unit 111',
          unitDescription: 'Some Force',
          isCurrentUnit: true,
          key: 1,
        },
        {
          kind: 'YEAR',
          date: '2013',
          hasData: false,
          key: '2-YEAR-2013',
        },
        {
          kind: 'YEAR',
          date: '2012',
          hasData: false,
          key: '2-YEAR-2012',
        },
        {
          kind: 'YEAR',
          date: '2011',
          hasData: true,
          key: '2-YEAR-2011',
        },
        {
          year: 2011,
          date: 'MAR 1',
          kind: 'AWARD',
          rank: 'Police Officer',
          unitName: 'Unit 153',
          unitDescription: 'Mobile Strike Force',
          isCurrentUnit: false,
          key: 2,
        }
      ]);
    });

    it('should fill no years between two items that in the same year', function () {
      const sameYearItems = [
        {
          year: 2014,
          date: 'MAR 1',
          kind: 'AWARD',
          rank: 'Some Officer',
          unitName: 'Unit 111',
          unitDescription: 'Some Force',
          isCurrentUnit: false,
          key: 1,
        },
        {
          year: 2014,
          date: 'MAR 1',
          kind: 'AWARD',
          rank: 'Police Officer',
          unitName: 'Unit 153',
          unitDescription: 'Mobile Strike Force',
          isCurrentUnit: false,
          key: 2,
        }
      ];

      fillYears(sameYearItems).should.eql([
        {
          kind: 'YEAR',
          date: '2014',
          hasData: true,
          key: '1-YEAR-2014'
        },
        ...sameYearItems
      ]);
    });
  });

  describe('fillUnitChange', function () {
    it('should add old unit name and description into unit change item', function () {
      const sameUnitItems = [
        {
          rank: 'Police Officer',
          unitName: 'Unit 111',
          unitDescription: 'Some Force',
        },
        {
          rank: 'Police Officer',
          kind: 'UNIT_CHANGE',
          unitName: 'Unit 111',
          unitDescription: 'Some Force',
        },
        {
          rank: 'Police Officer',
          unitName: 'Unit 153',
          unitDescription: 'Mobile Strike Force',
        }
      ];

      fillUnitChange(sameUnitItems).should.eql([
        {
          rank: 'Police Officer',
          unitName: 'Unit 111',
          unitDescription: 'Some Force',
        },
        {
          rank: 'Police Officer',
          kind: 'UNIT_CHANGE',
          unitName: 'Unit 111',
          unitDescription: 'Some Force',
          oldUnitName: 'Unit 153',
          oldUnitDescription: 'Mobile Strike Force',
        },
        {
          rank: 'Police Officer',
          unitName: 'Unit 153',
          unitDescription: 'Mobile Strike Force',
        },
      ]);
    });
  });

  describe('fillRankChange', function () {
    it('should add old rank into rank change item', function () {
      const sameRankItems = [{
        kind: 'CR',
        rank: 'Third Rank',
      }, {
        kind: 'RANK_CHANGE',
        rank: 'Third Rank',
      }, {
        kind: 'CR',
        rank: 'Second Rank',
      }, {
        kind: 'RANK_CHANGE',
        rank: 'Second Rank',
      }, {
        kind: 'JOINED',
        rank: 'First Rank',
      }];

      fillRankChange(sameRankItems).should.eql([{
        kind: 'CR',
        rank: 'Third Rank',
      }, {
        kind: 'RANK_CHANGE',
        rank: 'Third Rank',
        oldRank: 'Second Rank',
      }, {
        kind: 'CR',
        rank: 'Second Rank',
      }, {
        kind: 'RANK_CHANGE',
        rank: 'Second Rank',
        oldRank: 'First Rank',
      }, {
        kind: 'JOINED',
        rank: 'First Rank',
      }]);
    });
  });

  describe('getNewTimelineItems', function () {
    it('should return empty if the state is empty', function () {
      const emptyState = {
        officerPage: {
          timeline: {
            data: {}
          }
        }
      };
      getNewTimelineItems(emptyState, 8562).should.be.empty();
    });

    it('should ignore unsupported items', function () {
      const emptyState = {
        officerPage: {
          timeline: {
            data: {
              8562: [
                {
                  'unit_name': '007',
                  kind: 'SOME KIND',
                  'unit_description': 'District 007',
                  rank: 'Police Officer',
                  date: '2006-03-01',
                }
              ]
            }
          }
        }
      };
      getNewTimelineItems(emptyState, 8562).should.be.empty();
    });

    it('should process raw items with enough processors', function () {
      const state = {
        officerPage: {
          timeline: {
            data: {
              8562: [
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
                      url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.pdf',
                      'preview_image_url':
                        'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
                      title: 'CRID 294088 CR',
                      'file_type': 'document',
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
                  outcome: 'No Action Taken'
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
                  'unit_name': '044',
                  kind: 'JOINED',
                  'unit_description': 'Recruit Training Section',
                  date: '2000-02-05'
                }
              ]
            }
          }
        }
      };

      getNewTimelineItems(state, 8562).should.eql([
        {
          date: '2006',
          hasData: true,
          kind: 'YEAR',
          key: '0-YEAR-2006',
        },
        {
          year: 2006,
          date: 'MAR 1',
          kind: 'AWARD',
          rank: 'Detective',
          unitName: 'Unit 007',
          unitDescription: 'District 007',
          category: 'Honorable Mention',
          key: 0,
        },
        {
          date: 'FEB 28',
          kind: 'RANK_CHANGE',
          oldRank: 'Police Officer',
          rank: 'Detective',
          unitName: 'Unit 007',
          unitDescription: 'District 007',
          year: 2006,
          key: 1,
        },
        {
          date: '2005',
          hasData: true,
          kind: 'YEAR',
          key: '2-YEAR-2005',
        },
        {
          trrId: 1,
          category: 'Taser',
          date: 'DEC 17',
          kind: 'FORCE',
          rank: 'Police Officer',
          unitName: 'Unit 007',
          unitDescription: 'District 007',
          year: 2005,
          key: 2,
        },
        {
          trrId: 2,
          category: 'Use of Force Report',
          date: 'MAR 17',
          kind: 'FORCE',
          rank: 'Police Officer',
          unitName: 'Unit 007',
          unitDescription: 'District 007',
          year: 2005,
          key: 3,
        },
        {
          date: 'JAN 7',
          kind: 'UNIT_CHANGE',
          oldUnitDescription: 'Mobile Strike Force',
          oldUnitName: 'Unit 153',
          rank: 'Police Officer',
          unitName: 'Unit 007',
          unitDescription: 'District 007',
          year: 2005,
          key: 4,
        },
        {
          date: '2004',
          hasData: true,
          kind: 'YEAR',
          key: '5-YEAR-2004',
        },
        {
          trrId: 3,
          category: 'Firearm',
          date: 'DEC 17',
          kind: 'FORCE',
          rank: 'Police Officer',
          unitName: 'Unit 153',
          unitDescription: 'Mobile Strike Force',
          year: 2004,
          key: 5,
        },
        {
          date: '2003',
          hasData: true,
          kind: 'YEAR',
          key: '6-YEAR-2003',
        },
        {
          attachments: [
            {
              previewImageUrl:
                'https://assets.documentcloud.org/documents/3518950/pages/CRID-294088-CR-p1-normal.gif',
              title: 'CRID 294088 CR',
              url: 'https://www.documentcloud.org/documents/3518950-CRID-294088-CR.pdf',
              fileType: 'document',
            }
          ],
          category: 'Illegal Search',
          crid: '294088',
          date: 'NOV 26',
          finding: 'Exonerated',
          kind: 'CR',
          outcome: 'No Action Taken',
          rank: 'Police Officer',
          unitName: 'Unit 153',
          unitDescription: 'Mobile Strike Force',
          year: 2003,
          key: 6,
        },
        {
          attachments: [],
          category: 'Criminal Misconduct',
          crid: '260131',
          date: 'FEB 17',
          finding: 'Unfounded',
          kind: 'CR',
          outcome: 'No Action Taken',
          rank: 'Police Officer',
          unitName: 'Unit 153',
          unitDescription: 'Mobile Strike Force',
          year: 2003,
          key: 7,
        },
        {
          date: '2002',
          hasData: false,
          kind: 'YEAR',
          key: '8-YEAR-2002',
        },
        {
          date: '2001',
          hasData: false,
          kind: 'YEAR',
          key: '8-YEAR-2001',
        },
        {
          date: '2000',
          hasData: true,
          kind: 'YEAR',
          key: '8-YEAR-2000',
        },
        {
          date: 'APR 28',
          kind: 'RANK_CHANGE',
          oldRank: 'Unassigned',
          rank: 'Police Officer',
          unitName: 'Unit 153',
          unitDescription: 'Mobile Strike Force',
          year: 2000,
          key: 8,
        },
        {
          date: 'APR 28',
          kind: 'UNIT_CHANGE',
          oldUnitDescription: 'Recruit Training Section',
          oldUnitName: 'Unit 044',
          rank: 'Police Officer',
          unitName: 'Unit 153',
          unitDescription: 'Mobile Strike Force',
          year: 2000,
          key: 9,
        },
        {
          date: 'FEB 5',
          kind: 'JOINED',
          rank: 'Unassigned',
          unitName: 'Unit 044',
          unitDescription: 'Recruit Training Section',
          year: 2000,
          key: 10,
        }
      ])
      ;
    });
  });

  describe('isTimelineSuccess', function () {
    it('should return default value', function () {
      const state = {
        officerPage: {
          timeline: {
            isSuccess: {
              123: true
            }
          }
        }
      };
      isTimelineSuccess(state, 8562).should.be.false();
    });

    it('should return correct value', function () {
      const state = {
        officerPage: {
          timeline: {
            isSuccess: {
              8562: true
            }
          }
        }
      };
      isTimelineSuccess(state, 8562).should.be.true();
    });
  });
});
