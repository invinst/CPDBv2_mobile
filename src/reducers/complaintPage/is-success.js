import { handleActions } from 'redux-actions';

import { COMPLAINT_PAGE_REQUEST_SUCCESS, COMPLAINT_PAGE_REQUEST_FAILURE } from 'actions/complaint';


const isSuccess = handleActions({
  [COMPLAINT_PAGE_REQUEST_SUCCESS]: (state, action) => (true),
  [COMPLAINT_PAGE_REQUEST_FAILURE]: (state, action) => (false)
}, true);

export default isSuccess;
