import {
  SUGGESTION_REQUEST_SUCCESS,
  SUGGESTION_REQUEST_FAILURE,
  SUGGEST_ALL_REQUEST_SUCCESS,
  SUGGEST_ALL_REQUEST_FAILURE
} from 'actions/suggestion';
import suggestions from 'reducers/suggestionApp/suggestions';


describe('suggestions reducer', function () {
  it('should return initial state', function () {
    suggestions(undefined, {}).should.eql({
      CRS: { data: [], isShowingAll: false },
      FAQ: { data: [], isShowingAll: false },
      OFFICER: { data: [], isShowingAll: false },
      UNIT: { data: [], isShowingAll: false },
    });
  });

  it('should handle SUGGESTION_REQUEST_SUCCESS', function () {
    const suggestionResults = {
      CRS: [1, 2],
      FAQ: [3, 4],
      OFFICER: [5, 6],
      UNIT: [9, 10],
    };

    suggestions({}, {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: suggestionResults
    }).should.eql({
      CRS: { data: [1, 2], isShowingAll: false },
      FAQ: { data: [3, 4], isShowingAll: false },
      OFFICER: { data: [5, 6], isShowingAll: false },
      UNIT: { data: [9, 10], isShowingAll: false },
    });
  });

  it('should handle SUGGESTION_REQUEST_FAILURE', function () {
    suggestions({}, {
      type: SUGGESTION_REQUEST_FAILURE
    }).should.eql({});
  });

  it('should handle SUGGEST_ALL_REQUEST_SUCCESS', function () {
    suggestions({ any: 'any' }, {
      type: SUGGEST_ALL_REQUEST_SUCCESS,
      payload: {
        CRS: [1, 2]
      }
    }).should.eql({
      any: 'any',
      CRS: { data: [1, 2], isShowingAll: true }
    });
  });

  it('should handle SUGGEST_ALL_REQUEST_FAILURE', function () {
    suggestions({}, {
      type: SUGGEST_ALL_REQUEST_FAILURE
    }).should.eql({});
  });
});
