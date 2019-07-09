import { officersSelector } from 'selectors/embed';


describe('embed', function () {
  it('officersSelector', () => {
    officersSelector({
      embed: {}
    }).should.eql([]);

    officersSelector({
      embed: {
        officers: [
          {
            id: 13788,
            'complaint_count': 104,
            'full_name': 'Broderick Jones',
            percentile: {
              'officer_id': 13788,
              'year': 2016,
              'percentile_trr': '0',
              'percentile_allegation_internal': '87.828',
              'percentile_allegation_civilian': '99.9817',
            }
          },
          {
            id: 13789,
            'full_name': 'Queen Jones',
            'complaint_count': 0,
          }
        ]
      }
    }).should.deepEqual([
      {
        id: 13788,
        'complaint_count': 104,
        'full_name': 'Broderick Jones',
        percentile: {
          year: 2016,
          items: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Internal Allegations', value: 87.828 },
            { axis: 'Civilian Allegations', value: 99.9817 }
          ],
          visualTokenBackground: '#f95125',
          textColor: '#231F20',
        }
      },
      {
        id: 13789,
        'full_name': 'Queen Jones',
        'complaint_count': 0,
        percentile: null
      }
    ]);
  });
});
