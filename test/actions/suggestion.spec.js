import {
  suggestTerm, suggestAllFromCategory, fetchSuggestedSearchItems, focus, blur, clear, inputChanged, reset, saveToRecent,
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE,
  SUGGEST_ALL_REQUEST_START, SUGGEST_ALL_REQUEST_SUCCESS, SUGGEST_ALL_REQUEST_FAILURE,
  FETCH_SUGGESTED_SEARCH_ITEMS_START, FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS, FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE,
  SEARCH_FOCUS, SEARCH_BLUR, SEARCH_CLEAR, SEARCH_INPUT_CHANGED, SEARCH_RESET, SEARCH_SAVE_TO_RECENT
} from 'actions/suggestion';
import constants from 'constants';
import { v2Url } from 'utils/url-util';


describe('suggestions actions', function () {
  describe('suggestTerm', function () {
    it('should return right action', function () {
      suggestTerm().should.eql({
        types: [SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE],
        payload: {
          request: {
            url: v2Url(constants.SUGGESTION_API_ENDPOINT),
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
            url: v2Url(constants.SUGGESTION_API_ENDPOINT + query + '/'),
            adapter: undefined,
            params: { contentType: categoryPath }
          }
        }
      });
    });
  });

  describe('fetchSuggestedSearchItems', function () {
    it('should return right action', function () {
      fetchSuggestedSearchItems().should.eql({
        types: [
          FETCH_SUGGESTED_SEARCH_ITEMS_START,
          FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
          FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE
        ],
        payload: {
          request: {
            url: v2Url(constants.SUGGESTION_API_ENDPOINT),
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
      saveToRecent().should.eql({
        type: SEARCH_SAVE_TO_RECENT
      });
    });
  });
});
