import { handleActions } from 'redux-actions';

import { OFFICER_PAGE_REQUEST_SUCCESS, OFFICER_PAGE_REQUEST_FAILURE } from 'actions/officer';


const isSuccess = handleActions({
  [OFFICER_PAGE_REQUEST_SUCCESS]: (state, action) => (true),
  [OFFICER_PAGE_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isSuccess;
