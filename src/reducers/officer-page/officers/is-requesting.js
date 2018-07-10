import { handleActions } from 'redux-actions';

import { OFFICER_REQUEST_START, OFFICER_REQUEST_SUCCESS, OFFICER_REQUEST_FAILURE }
from 'actions/officer';


const isRequesting = handleActions({
  [OFFICER_REQUEST_START]: (state, action) => (true),
  [OFFICER_REQUEST_SUCCESS]: (state, action) => (false),
  [OFFICER_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
