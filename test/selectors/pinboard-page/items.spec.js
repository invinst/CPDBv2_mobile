import { pinnedOfficersSelector, pinnedCRsSelector, pinnedTRRsSelector } from 'selectors/pinboard-page/items';
import { PinboardFactory } from 'utils/tests/factories/pinboard';


describe('PinboardPage Items selectors', function () {
  const state = {
    pinboardPage: PinboardFactory.build({
      crItems: [{
        crid: '1000001',
        'incident_date': '2010-01-01',
        point: { 'lon': 1.0, 'lat': 1.0 },
        'category': 'Use Of Force',
      }],
      officerItems: [{
        id: 1,
        'full_name': 'Daryl Mack',
        'complaint_count': 0,
        'sustained_count': 0,
        'birth_year': 1975,
        'complaint_percentile': 99.3450,
        race: 'White',
        gender: 'Male',
        rank: 'Police Officer',
        percentile: {
          'percentile_trr': '12.0000',
          'percentile_allegation': '99.3450',
          'percentile_allegation_civilian': '98.4344',
          'percentile_allegation_internal': '99.7840',
          year: 2016,
          id: 1,
        }
      }],
      trrItems: [{
        id: 1,
        'trr_datetime': '2012-01-01',
        category: 'Impact Weapon',
        point: { 'lon': 1.0, 'lat': 1.0 },
      }],
    })
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
          textColor: '#231F20',
          visualTokenBackground: '#ff4f13',
          year: 2016,
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
});
