import {
  SUGGESTION_REQUEST_SUCCESS,
  SUGGESTION_REQUEST_FAILURE,
  SUGGEST_ALL_REQUEST_SUCCESS,
  SUGGEST_ALL_REQUEST_FAILURE,
} from 'actions/suggestion';
import suggestions from 'reducers/suggestion-app/suggestions';


describe('suggestions reducer', function () {
  it('should return initial state', function () {
    suggestions(undefined, {}).should.eql({
      'DATE > CR': { data: [], isShowingAll: false },
      'DATE > TRR': { data: [], isShowingAll: false },
      'DATE > OFFICERS': { data: [], isShowingAll: false },
      'INVESTIGATOR > CR': { data: [], isShowingAll: false },
      CR: { data: [], isShowingAll: false },
      TRR: { data: [], isShowingAll: false },
      OFFICER: { data: [], isShowingAll: false },
      UNIT: { data: [], isShowingAll: false },
    });
  });

  it('should handle SUGGESTION_REQUEST_SUCCESS', function () {
    const suggestionResults = {
      'DATE > CR': [11, 12],
      'DATE > TRR': [13, 14],
      'DATE > OFFICERS': [15, 16],
      'INVESTIGATOR > CR': [123, 456],
      CR: [1, 2],
      TRR: [3, 4],
      OFFICER: [5, 6],
      UNIT: [9, 10],
    };

    suggestions({}, {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: suggestionResults,
    }).should.eql({
      'DATE > CR': { data: [11, 12], isShowingAll: false },
      'DATE > TRR': { data: [13, 14], isShowingAll: false },
      'DATE > OFFICERS': { data: [15, 16], isShowingAll: false },
      'INVESTIGATOR > CR': { data: [123, 456], isShowingAll: false },
      CR: { data: [1, 2], isShowingAll: false },
      TRR: { data: [3, 4], isShowingAll: false },
      OFFICER: { data: [5, 6], isShowingAll: false },
      UNIT: { data: [9, 10], isShowingAll: false },
    });
  });

  it('should handle SUGGESTION_REQUEST_FAILURE', function () {
    suggestions({}, {
      type: SUGGESTION_REQUEST_FAILURE,
    }).should.eql({});
  });

  it('should handle SUGGEST_ALL_REQUEST_SUCCESS', function () {
    suggestions({ any: 'any' }, {
      type: SUGGEST_ALL_REQUEST_SUCCESS,
      payload: {
        CRS: [1, 2],
      },
    }).should.eql({
      any: 'any',
      CRS: { data: [1, 2], isShowingAll: true },
    });
  });

  it('should handle SUGGEST_ALL_REQUEST_FAILURE', function () {
    suggestions({}, {
      type: SUGGEST_ALL_REQUEST_FAILURE,
    }).should.eql({});
  });
});
