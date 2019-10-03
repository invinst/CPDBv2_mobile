import {
  FETCH_RECENT_SEARCH_ITEMS_START,
  FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
  SET_RECENT_SUGGESTIONS_REQUESTED,
} from 'actions/suggestion';

import recentSuggestionsRequested from 'reducers/suggestion-app/recent-suggestions-requested';


describe('recentSuggestionsRequested reducer', function () {
  it('should have initial state', function () {
    recentSuggestionsRequested(undefined, {}).should.be.false();
  });

  it('should handle FETCH_RECENT_SEARCH_ITEMS_START', function () {
    recentSuggestionsRequested(true, {
      type: FETCH_RECENT_SEARCH_ITEMS_START,
      payload: {},
    }).should.be.false();
  });

  it('should handle FETCH_RECENT_SEARCH_ITEMS_SUCCESS', function () {
    recentSuggestionsRequested(false, {
      type: FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
      payload: {},
    }).should.be.true();
  });

  it('should handle SET_RECENT_SUGGESTIONS_REQUESTED', function () {
    recentSuggestionsRequested(false, {
      type: SET_RECENT_SUGGESTIONS_REQUESTED,
      payload: {},
    }).should.be.true();
  });
});
