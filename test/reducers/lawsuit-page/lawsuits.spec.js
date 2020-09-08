import lawsuitsReducer from 'reducers/lawsuit-page/lawsuits';
import * as constants from 'actions/lawsuit-page';


describe('lawsuitsReducer', function () {
  it('should return initial state', function () {
    lawsuitsReducer(undefined, {}).should.eql({});
  });

  it('should handle LAWSUIT_FETCH_SUCCESS', function () {
    lawsuitsReducer({}, {
      type: constants.LAWSUIT_FETCH_SUCCESS,
      payload: { 'case_no': '00-L-5230', data: 'data' },
    }).should.eql({
      '00-L-5230': {
        data: 'data',
        'case_no': '00-L-5230',
      } });
  });
});
