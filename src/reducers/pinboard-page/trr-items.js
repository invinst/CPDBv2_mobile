import { handleActions } from 'redux-actions';

import {
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
} from 'actions/pinboard';


export default handleActions({
  [PINBOARD_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
}, []);
