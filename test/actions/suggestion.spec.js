import {
  suggestTerm, focus, blur, clear, inputChanged,
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE,
  SEARCH_FOCUS, SEARCH_BLUR, SEARCH_CLEAR, SEARCH_INPUT_CHANGED
} from 'actions/suggestion';
import constants from 'constants';


describe('suggestions actions', function () {
  describe('suggestTerm', function () {
    it('should return right action', function () {
      suggestTerm().should.eql({
        types: [SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE],
        payload: {
          request: {
            url: constants.SUGGESTION_API_ENDPOINT,
            adapter: undefined,
            params: undefined
        }
        }
      })
    });
  });

  describe('focus', function () {
    it('should return right action', function () {
      focus().should.eql({
        type: SEARCH_FOCUS
      });
    });
  });

  describe('blur', function () {
    it('should return right action', function () {
      blur().should.eql({
        type: SEARCH_BLUR
      });
    });
  });

  describe('clear', function () {
    it('should return right action', function () {
      clear().should.eql({
        type: SEARCH_CLEAR
      });
    });
  });

  describe('inputChanged', function () {
    it('should return right action', function () {
      const query = 'query';
      inputChanged(query).should.eql({
        type: SEARCH_INPUT_CHANGED,
        payload: query
      });
    });
  });
});
