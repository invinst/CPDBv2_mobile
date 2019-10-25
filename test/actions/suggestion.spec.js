import {
  suggestTerm,
  focus,
  blur,
  clear,
  inputChanged,
  queryChanged,
  reset,
  saveToRecent,
  fetchRecentSearchItems,
  fetchedEmptyRecentSearchItems,
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE,
  SEARCH_FOCUS,
  SEARCH_BLUR,
  SEARCH_CLEAR,
  SEARCH_INPUT_CHANGED,
  SEARCH_RESET,
  SEARCH_SAVE_TO_RECENT,
  SEARCH_QUERY_CHANGED,
  FETCH_RECENT_SEARCH_ITEMS_FAILURE, FETCH_RECENT_SEARCH_ITEMS_START, FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
  SET_RECENT_SUGGESTIONS_REQUESTED,
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
            params: undefined,
          },
        },
      });
    });
  });

  describe('fetchRecentSearchItems', function () {
    it('should return right action', function () {
      fetchRecentSearchItems([8562], ['271235'], [123]).should.eql({
        types: [
          FETCH_RECENT_SEARCH_ITEMS_START,
          FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
          FETCH_RECENT_SEARCH_ITEMS_FAILURE,
        ],
        payload: {
          request: {
            url: v2Url(constants.RECENT_SEARCH_ITEMS_API_ENDPOINT),
            adapter: undefined,
            params: {
              'officer_ids': [8562],
              crids: ['271235'],
              'trr_ids': [123],
            },
          },
        },
      });
    });
  });

  describe('focus', function () {
    it('should return right action', function () {
      focus().should.eql({
        type: SEARCH_FOCUS,
      });
    });
  });

  describe('blur', function () {
    it('should return right action', function () {
      blur().should.eql({
        type: SEARCH_BLUR,
      });
    });
  });

  describe('clear', function () {
    it('should return right action', function () {
      clear().should.eql({
        type: SEARCH_CLEAR,
      });
    });
  });

  describe('inputChanged', function () {
    it('should return right action', function () {
      const query = 'query';
      inputChanged(query).should.eql({
        type: SEARCH_INPUT_CHANGED,
        payload: query,
      });
    });
  });

  describe('queryChanged', function () {
    it('should return right action', function () {
      const query = 'query';
      queryChanged(query).should.eql({
        type: SEARCH_QUERY_CHANGED,
        payload: query,
      });
    });
  });

  describe('reset', function () {
    it('should return right action', function () {
      reset().should.eql({
        type: SEARCH_RESET,
      });
    });
  });

  describe('saveToRecent', function () {
    it('should return right action', function () {
      saveToRecent().should.eql({
        type: SEARCH_SAVE_TO_RECENT,
      });
    });
  });

  describe('fetchedEmptyRecentSearchItems', function () {
    it('should return right action', function () {
      fetchedEmptyRecentSearchItems().should.eql({
        type: SET_RECENT_SUGGESTIONS_REQUESTED,
      });
    });
  });
});
