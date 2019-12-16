import { handleActions } from 'redux-actions';

import {
  FETCH_RECENT_SEARCH_ITEMS_START,
  FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
  SET_RECENT_SUGGESTIONS_REQUESTED,
} from 'actions/suggestion';


export default handleActions({
  [FETCH_RECENT_SEARCH_ITEMS_START]: (state, action) => (false),
  [FETCH_RECENT_SEARCH_ITEMS_SUCCESS]: (state, action) => (true),
  [SET_RECENT_SUGGESTIONS_REQUESTED]: (state, action) => (true),
}, false);
