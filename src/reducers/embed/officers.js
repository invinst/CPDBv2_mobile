import { handleActions } from 'redux-actions';

import {
  OFFICERS_REQUEST_SUCCESS,
  OFFICERS_REQUEST_FAILURE,
} from 'actions/embed';


export default handleActions({
  [OFFICERS_REQUEST_SUCCESS]: (state, action) => action.payload,
  [OFFICERS_REQUEST_FAILURE]: (state, action) => state,
}, []);
