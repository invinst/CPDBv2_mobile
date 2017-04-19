import { handleActions } from 'redux-actions';

import {
  OFFICER_TIMELINE_REQUEST_START,
  OFFICER_TIMELINE_REQUEST_SUCCESS,
  OFFICER_TIMELINE_REQUEST_FAILURE
} from 'actions/officer';


const isSuccess = handleActions({
  [OFFICER_TIMELINE_REQUEST_START]: (state, action) => (true),
  [OFFICER_TIMELINE_REQUEST_SUCCESS]: (state, action) => (true),
  [OFFICER_TIMELINE_REQUEST_FAILURE]: (state, action) => (false)
}, true);

export default isSuccess;
