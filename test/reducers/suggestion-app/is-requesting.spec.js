import { SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE } from 'actions/suggestion';
import isRequesting from 'reducers/suggestion-app/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle SUGGESTION_REQUEST_START', function () {
    isRequesting(false, {
      type: SUGGESTION_REQUEST_START,
    }).should.be.true();
  });

  it('should handle SUGGESTION_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: SUGGESTION_REQUEST_SUCCESS,
    }).should.be.false();
  });

  it('should handle SUGGESTION_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: SUGGESTION_REQUEST_FAILURE,
    }).should.be.false();
  });
});
