import { handleActions } from 'redux-actions';

import {
  OFFICER_COACCUSALS_REQUEST_FAILURE,
  OFFICER_COACCUSALS_REQUEST_START,
  OFFICER_COACCUSALS_REQUEST_SUCCESS
} from 'actions/officer-page/coaccusals';


const isSuccess = handleActions({
  [OFFICER_COACCUSALS_REQUEST_START]: (state, action) => (true),
  [OFFICER_COACCUSALS_REQUEST_SUCCESS]: (state, action) => (true),
  [OFFICER_COACCUSALS_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isSuccess;
