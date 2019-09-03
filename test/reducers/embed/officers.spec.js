import {
  OFFICERS_REQUEST_SUCCESS,
  OFFICERS_REQUEST_FAILURE,
} from 'actions/embed';
import officers from 'reducers/embed/officers';


describe('officers reducer', function () {
  it('should return initial state', function () {
    officers(undefined, []).should.be.empty();
  });

  it('should handle OFFICERS_REQUEST_SUCCESS', function () {
    officers({}, {
      type: OFFICERS_REQUEST_SUCCESS,
      payload: ['abc'],
    }).should.eql(['abc']);
  });

  it('should handle OFFICERS_REQUEST_FAILURE', function () {
    officers(['abc'], {
      type: OFFICERS_REQUEST_FAILURE,
      payload: {},
    }).should.eql(['abc']);
  });
});
