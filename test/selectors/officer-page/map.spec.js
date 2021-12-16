import {
  mapLegendSelector,
  mapMarkerGroupsSelector,
  crMapMarkersTransform,
  trrMapMarkerTransform,
  rawMapMarkersSelector,
  hasMapMarkersSelector,
} from 'selectors/officer-page/map';


describe('Officer map selectors', function () {
  const sustainedCr = {
    category: 'Illegal Search',
    'unit_name': '153',
    kind: 'CR',
    subcategory: 'Search Of Premise Without Warrant',
    point: {
      lat: 41.918008,
      lon: -87.73173299999999,
    },
    crid: '1045343',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2011-05-11',
    finding: 'Sustained',
    outcome: 'No Action Taken',
  };
  const exoneratedCr = {
    category: 'Illegal Search',
    'unit_name': '153',
    kind: 'CR',
    subcategory: 'Search Of Premise Without Warrant',
    point: {
      lat: 41.7630623832,
      lon: -87.67122688239999,
    },
    crid: '294619',
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2003-12-21',
    outcome: 'No Action Taken',
    finding: 'Exonerated',
    attachments: [
      {
        url: 'https://www.documentcloud.org/documents/3518948-CRID-294619-CR.html',
        'preview_image_url': 'https://s3.documentcloud.org/documents/3518948/pages/CRID-294619-CR-p1-normal.gif',
        title: 'CRID 294619 CR',
      },
    ],
  };
  const trr = {
    'trr_id': '123456',
    'unit_name': '153',
    kind: 'FORCE',
    taser: false,
    'unit_description': 'Mobile Strike Force',
    rank: 'Police Officer',
    date: '2004-12-17',
    'firearm_used': true,
    point: {
      lat: 35.3,
      lon: 50.5,
    },
  };
  const unitChange = {
    'unit_name': '007',
    kind: 'UNIT_CHANGE',
    'unit_description': 'District 007',
    rank: 'Police Officer',
    date: '1993-01-07',
  };

  describe('crMapMarkersTransform', function () {
    it('should return correct item', function () {
      const crItem = {
        category: 'Conduct Unbecoming (Off-Duty)',
        finding: 'Not Sustained',
        kind: 'CR',
        point: {
          lat: 41.887673,
          lon: -87.62355,
        },
        crid: '1002787',
        date: '2007-01-18',
      };
      crMapMarkersTransform(crItem).should.eql({
        point: {
          lat: 41.887673,
          lon: -87.62355,
        },
        kind: 'CR',
        pointType: 'CR',
        id: '1002787',
        category: 'Conduct Unbecoming (Off-Duty)',
        date: '2007-01-18',
      });
    });
  });

  describe('trrMapMarkersTransform', function () {
    it('should return correct item', function () {
      const trrItem = {
        'trr_id': '56789',
        kind: 'FORCE',
        taser: true,
        date: '2007-01-18',
        'firearm_used': false,
        point: {
          lat: 50,
          lon: -87,
        },
      };
      trrMapMarkerTransform(trrItem).should.eql({
        point: {
          lat: 50,
          lon: -87,
        },
        kind: 'FORCE',
        id: '56789',
        category: 'Taser',
        date: '2007-01-18',
      });
    });
  });

  describe('mapLegendSelector', function () {
    it('should return correct legend info', function () {
      const state = {
        officerPage: {
          officers: {
            data: {
              8562: {
                'trr_count': 1,
                'civilian_compliment_count': 0,
                rank: 'Police Officer',
                'full_name': 'Jerome Finnigan',
                'sustained_count': 4,
                id: 8562,
                unit: {
                  'unit_name': '153',
                  id: 112,
                  description: 'Mobile Strike Force',
                },
                'percentile_allegation': 99.98,
                'major_award_count': 0,
                'date_of_appt': '1988-12-05',
                'unsustained_count': 36,
                to: '/officer/8562/jerome-finnigan/',
                'discipline_count': 0,
                badge: '5167',
                'birth_year': 1963,
                'allegation_count': 90,
                'date_of_resignation': '2008-08-05',
                'current_salary': 73116,
                active: 'Inactive',
                'honorable_mention_count': 1,
                url: 'https://beta.cpdb.co/officer/jerome-finnigan/8562',
                gender: 'Male',
                race: 'White',
              },
            },
          },
        },
      };
      mapLegendSelector(state, 8562).should.eql({
        unsustainedCount: 36,
        sustainedCount: 4,
        useOfForceCount: 1,
      });
    });
  });

  describe('rawMapMarkersSelector', function () {
    it('should return correct marker item', function () {
      const state = {
        officerPage: {
          timeline: {
            data: {
              8562: [sustainedCr, exoneratedCr, trr, unitChange],
            },
          },
        },
      };
      rawMapMarkersSelector(state, 8562).should.eql([sustainedCr, trr]);
    });
  });

  describe('mapMarkerGroupsSelector', function () {
    it('should return correct marker', function () {
      const state = {
        officerPage: {
          timeline: {
            data: {
              8562: [sustainedCr, exoneratedCr, trr, unitChange],
            },
          },
        },
      };
      mapMarkerGroupsSelector(state, 8562).should.eql({
        crs: [
          {
            point: {
              lat: 41.918008,
              lon: -87.73173299999999,
            },
            kind: 'CR',
            pointType: 'SUSTAINED-CR',
            id: '1045343',
            category: 'Illegal Search',
            date: '2011-05-11',
          },
        ],
        trrs: [
          {
            point: {
              lat: 35.3,
              lon: 50.5,
            },
            kind: 'FORCE',
            id: '123456',
            category: 'Firearm',
            date: '2004-12-17',
          },
        ],
      });
    });
  });

  describe('hasMapMarkersSelector', function () {
    it('should return false if there is no marker', function () {
      const state = {
        officerPage: {
          timeline: {
            data: [],
          },
        },
      };
      hasMapMarkersSelector(state, 8562).should.be.false();
    });

    it('should return true if have marker', function () {
      const state = {
        officerPage: {
          timeline: {
            data: {
              8562: [sustainedCr, exoneratedCr, trr, unitChange],
            },
          },
        },
      };
      hasMapMarkersSelector(state, 8562).should.be.true();
    });
  });
});
