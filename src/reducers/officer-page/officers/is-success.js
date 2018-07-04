import { handleActions } from 'redux-actions';

import {
  OFFICER_REQUEST_START,
  OFFICER_REQUEST_SUCCESS,
  OFFICER_REQUEST_FAILURE
} from 'actions/officer';


const isSuccess = handleActions({
  [OFFICER_REQUEST_START]: (state, action) => (true),
  [OFFICER_REQUEST_SUCCESS]: (state, action) => (true),
  [OFFICER_REQUEST_FAILURE]: (state, action) => (false)
}, true);

export default isSuccess;
