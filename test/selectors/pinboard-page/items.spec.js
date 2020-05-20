import {
  pinnedOfficersSelector,
  pinnedCRsSelector,
  pinnedTRRsSelector,
  getPinnedCRsRequesting,
  getPinnedOfficersRequesting,
  getPinnedTRRsRequesting,
} from 'selectors/pinboard-page/items';
import { PinboardFactory } from 'utils/tests/factories/pinboard';


describe('PinboardPage Items selectors', function () {
  const state = {
    pinboardPage: PinboardFactory.build({
      crItems: {
        requesting: false,
        items: [{
          crid: '1000001',
          'incident_date': '2010-01-01',
          point: { 'lon': 1.0, 'lat': 1.0 },
          'most_common_category': 'Use Of Force',
        }],
      },
      officerItems: {
        requesting: false,
        items: [{
          id: 1,
          'full_name': 'Daryl Mack',
          'complaint_count': 0,
          'sustained_count': 0,
          'birth_year': 1975,
          'percentile_allegation': 99.3450,
          race: 'White',
          gender: 'Male',
          rank: 'Police Officer',
          'percentile_trr': '12.0000',
          'percentile_allegation': '99.3450',
          'percentile_allegation_civilian': '98.4344',
          'percentile_allegation_internal': '99.7840',
        }],
      },
      trrItems: {
        requesting: false,
        items: [{
          id: 1,
          'trr_datetime': '2012-01-01',
          category: 'Impact Weapon',
          point: { 'lon': 1.0, 'lat': 1.0 },
        }],
      },
    }),
  };

  describe('pinnedOfficersSelector selector', function () {
    it('should return transformed officers', function () {
      pinnedOfficersSelector(state).should.eql([{
        id: '1',
        type: 'OFFICER',
        isPinned: true,
        complaintCount: 0,
        fullName: 'Daryl Mack',
        officerId: 1,
        percentile: {
          items: [
            {
              axis: 'Use of Force Reports',
              value: 12,
            },
            {
              axis: 'Internal Allegations',
              value: 99.784,
            },
            {
              axis: 'Civilian Allegations',
              value: 98.4344,
            },
          ],
          textColor: '#DFDFDF',
          visualTokenBackground: '#F52524',
        },
        rank: 'Police Officer',
      }]);
    });
  });

  describe('pinnedCRsSelector selector', function () {
    it('should return transformed crs', function () {
      pinnedCRsSelector(state).should.eql([{
        id: '1000001',
        type: 'CR',
        isPinned: true,
        incidentDate: '2010-01-01',
        category: 'Use Of Force',
        point: { lon: 1, lat: 1 },
      }]);
    });
  });

  describe('pinnedTRRsSelector selector', function () {
    it('should return transformed trrs', function () {
      pinnedTRRsSelector(state).should.eql([{
        id: '1',
        type: 'TRR',
        isPinned: true,
        category: 'Impact Weapon',
        trrDate: '2012-01-01',
        point: { lon: 1, lat: 1 },
      }]);
    });
  });

  describe('getPinnedCRsRequesting', function () {
    it('should return requesting status', function () {
      getPinnedCRsRequesting({
        pinboardPage: {
          crItems: {
            requesting: true,
            items: [],
          },
        },
      }).should.be.true();

      getPinnedCRsRequesting({
        pinboardPage: {
          crItems: {
            requesting: false,
            items: [],
          },
        },
      }).should.be.false();
    });
  });

  describe('getPinnedOfficersRequesting', function () {
    it('should return requesting status', function () {
      getPinnedOfficersRequesting({
        pinboardPage: {
          officerItems: {
            requesting: true,
            items: [],
          },
        },
      }).should.be.true();

      getPinnedOfficersRequesting({
        pinboardPage: {
          officerItems: {
            requesting: false,
            items: [],
          },
        },
      }).should.be.false();
    });
  });

  describe('getPinnedTRRsRequesting', function () {
    it('should return requesting status', function () {
      getPinnedTRRsRequesting({
        pinboardPage: {
          trrItems: {
            requesting: true,
            items: [],
          },
        },
      }).should.be.true();

      getPinnedTRRsRequesting({
        pinboardPage: {
          trrItems: {
            requesting: false,
            items: [],
          },
        },
      }).should.be.false();
    });
  });
});
