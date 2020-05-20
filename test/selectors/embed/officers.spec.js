import { officersSelector } from 'selectors/embed';


describe('embed', function () {
  it('officersSelector', function () {
    officersSelector({
      embed: {},
    }).should.eql([]);

    officersSelector({
      embed: {
        officers: [
          {
            id: 13788,
            'complaint_count': 104,
            'full_name': 'Broderick Jones',
            'percentile_trr': '0',
            'percentile_allegation': '77.828',
            'percentile_allegation_internal': '87.828',
            'percentile_allegation_civilian': '99.9817',
          },
          {
            id: 13789,
            'full_name': 'Queen Jones',
            'complaint_count': 0,
          },
        ],
      },
    }).should.deepEqual([
      {
        id: 13788,
        'complaint_count': 104,
        'full_name': 'Broderick Jones',
        percentile: {
          items: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Internal Allegations', value: 87.828 },
            { axis: 'Civilian Allegations', value: 99.9817 },
          ],
          visualTokenBackground: '#FF412C',
          textColor: '#231F20',
        },
      },
      {
        id: 13789,
        'full_name': 'Queen Jones',
        'complaint_count': 0,
        percentile: {},
      },
    ]);
  });
});
