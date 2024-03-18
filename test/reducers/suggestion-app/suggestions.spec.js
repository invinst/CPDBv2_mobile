import {
  SUGGESTION_REQUEST_SUCCESS,
  SUGGESTION_REQUEST_FAILURE,
  SUGGEST_ALL_REQUEST_SUCCESS,
  SUGGEST_ALL_REQUEST_FAILURE,
  SUGGESTION_SINGLE_REQUEST_SUCCESS,
} from 'actions/suggestion';
import suggestions from 'reducers/suggestion-app/suggestions';


describe('suggestions reducer', function () {
  it('should return initial state', function () {
    suggestions(undefined, {}).should.eql({
      'DATE > CR': [],
      'DATE > TRR': [],
      'DATE > OFFICERS': [],
      'INVESTIGATOR > CR': [],
      LAWSUIT: [],
      CR: [],
      TRR: [],
      OFFICER: [],
      UNIT: [],
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
      LAWSUIT: [11, 12],
    };

    suggestions({}, {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: suggestionResults,
    }).should.eql({
      'DATE > CR': [11, 12],
      'DATE > TRR': [13, 14],
      'DATE > OFFICERS': [15, 16],
      'INVESTIGATOR > CR': [123, 456],
      CR: [1, 2],
      TRR: [3, 4],
      OFFICER: [5, 6],
      UNIT: [9, 10],
      LAWSUIT: [11, 12],
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
      CRS: [1, 2],
    });
  });

  it('should handle SUGGEST_ALL_REQUEST_FAILURE', function () {
    suggestions({}, {
      type: SUGGEST_ALL_REQUEST_FAILURE,
    }).should.eql({});
  });

  it('should handle SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    suggestions({
      OFFICER: [{ id: 1, a: 'b' }],
    }, {
      type: SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        results: [
          { id: 2, c: 'd' },
        ],
      },
      request: {
        params: {
          contentType: 'OFFICER',
        },
      },
    }).should.eql({
      OFFICER: [
        { id: 1, a: 'b' },
        { id: 2, c: 'd' },
      ],
    });
  });
});
