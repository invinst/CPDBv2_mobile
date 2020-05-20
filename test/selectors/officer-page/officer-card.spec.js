import { officerCardTransform } from 'selectors/officer-page/officer-card';


describe('officerCardTransform', function () {
  it('should transform officer card correctly', function () {
    officerCardTransform({
      'id': 1,
      'full_name': 'Michel Foo',
      'rank': 'Po As Detective',
      'percentile_allegation': '98.3',
      'percentile_allegation_civilian': '97.0',
      'percentile_allegation_internal': '82.0',
      'percentile_trr': '92.3',
    }).should.eql({
      id: 1,
      officerId: 1,
      fullName: 'Michel Foo',
      rank: 'Po As Detective',
      percentile: {
        items: [{
          'axis': 'Use of Force Reports',
          'value': 92.3,
        }, {
          'axis': 'Internal Allegations',
          'value': 82,
        }, {
          'axis': 'Civilian Allegations',
          'value': 97,
        }],
        textColor: '#DFDFDF',
        visualTokenBackground: '#F52524',
      },
    });
  });
});
