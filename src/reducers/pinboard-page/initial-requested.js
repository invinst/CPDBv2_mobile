import { handleActions } from 'redux-actions';

import {
  PINBOARD_FETCH_REQUEST_START,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_FAILURE,
} from 'actions/pinboard';

export default handleActions({
  [PINBOARD_FETCH_REQUEST_START]: (state, action) => false,
  [PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => true,
  [PINBOARD_FETCH_REQUEST_FAILURE]: (state, action) => true,
}, false);
