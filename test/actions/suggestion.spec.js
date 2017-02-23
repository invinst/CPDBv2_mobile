import {
  suggestTerm, suggestAllFromCategory, suggestEmptyTerm, focus, blur, clear, inputChanged, reset, clicked,
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE,
  SUGGEST_ALL_REQUEST_START, SUGGEST_ALL_REQUEST_SUCCESS, SUGGEST_ALL_REQUEST_FAILURE,
  SUGGEST_EMPTY_TERM_REQUEST_START, SUGGEST_EMPTY_TERM_REQUEST_SUCCESS, SUGGEST_EMPTY_TERM_REQUEST_FAILURE,
  SEARCH_FOCUS, SEARCH_BLUR, SEARCH_CLEAR, SEARCH_INPUT_CHANGED, SEARCH_RESET, SEARCH_CLICKED
} from 'actions/suggestion';
import constants from 'constants';
import { v2v2Url } from 'utils/UrlUtil';


describe('suggestions actions', function () {
  describe('suggestTerm', function () {
    it('should return right action', function () {
      suggestTerm().should.eql({
        types: [SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE],
        payload: {
          request: {
            url: v2v2Url(constants.SUGGESTION_API_ENDPOINT),
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });

  describe('suggestAllFromCategory', function () {
    it('should return right action', function () {
      const categoryPath = 'OFFICERS';
      const query = 'ja';

      suggestAllFromCategory(categoryPath, query).should.eql({
        types: [SUGGEST_ALL_REQUEST_START, SUGGEST_ALL_REQUEST_SUCCESS, SUGGEST_ALL_REQUEST_FAILURE],
        payload: {
          request: {
            url: v2v2Url(constants.SUGGESTION_API_ENDPOINT + query + '/'),
            adapter: undefined,
            params: { contentType: categoryPath }
          }
        }
      });
    });
  });

  describe('suggestEmptyTerm', function () {
    it('should return right action', function () {
      suggestEmptyTerm().should.eql({
        types: [SUGGEST_EMPTY_TERM_REQUEST_START, SUGGEST_EMPTY_TERM_REQUEST_SUCCESS, SUGGEST_EMPTY_TERM_REQUEST_FAILURE],
        payload: {
          request: {
            url: v2v2Url(constants.SUGGESTION_API_ENDPOINT),
            adapter: undefined,
            params: {}
          }
        }
      });
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

  describe('reset', function () {
    it('should return right action', function () {
      reset().should.eql({
        type: SEARCH_RESET
      });
    });
  });

  describe('reset', function () {
    it('should return right action', function () {
      clicked().should.eql({
        type: SEARCH_CLICKED
      });
    });
  });
});
