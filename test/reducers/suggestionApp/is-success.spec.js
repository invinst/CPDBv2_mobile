import { SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE } from 'actions/suggestion';
import isSuccess from 'reducers/suggestionApp/is-success';


describe('isSuccess reducer', function () {
  it('should return initial state', function () {
    isSuccess(undefined, {}).should.be.true();
  });

  it('should handle SUGGESTION_REQUEST_SUCCESS', function () {
    isSuccess(false, {
      type: SUGGESTION_REQUEST_SUCCESS
    }).should.be.true();
  });

  it('should handle SUGGESTION_REQUEST_FAILURE', function () {
    isSuccess(true, {
      type: SUGGESTION_REQUEST_FAILURE
    }).should.be.false();
  });
});
