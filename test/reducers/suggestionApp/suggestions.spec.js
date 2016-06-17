import { SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE } from 'actions/suggestion';
import suggestions from 'reducers/suggestionApp/suggestions';


describe('suggestions reducer', function () {
  it('should return initial state', function () {
    suggestions(undefined, {}).should.eql([]);
  });

  it('should handle SUGGESTION_REQUEST_SUCCESS', function () {
    const suggestionResults = [1, 2, 3];

    suggestions([], {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: suggestionResults
    }).should.eql(suggestionResults);
  });

  it('should handle SUGGESTION_REQUEST_FAILURE', function () {
    suggestions([1, 2, 3], {
      type: SUGGESTION_REQUEST_FAILURE
    }).should.eql([]);
  });
});
