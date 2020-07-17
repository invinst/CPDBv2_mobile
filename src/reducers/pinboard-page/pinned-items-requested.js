import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_FETCH_REQUEST_START,
  PINBOARD_TRRS_FETCH_REQUEST_START,
} from 'actions/pinboard';

export default handleActions({
  [PINBOARD_COMPLAINTS_FETCH_REQUEST_START]: (state, action) => true,
  [PINBOARD_OFFICERS_FETCH_REQUEST_START]: (state, action) => true,
  [PINBOARD_TRRS_FETCH_REQUEST_START]: (state, action) => true,
  [LOCATION_CHANGE]: (state, action) => action.payload.action === 'REPLACE' && state,
}, false);
