import { handleActions } from 'redux-actions';

import {
  COMPLAINT_PAGE_REQUEST_START, COMPLAINT_PAGE_REQUEST_SUCCESS, COMPLAINT_PAGE_REQUEST_FAILURE
} from 'actions/complaint';


const isRequesting = handleActions({
  [COMPLAINT_PAGE_REQUEST_START]: (state, action) => (true),
  [COMPLAINT_PAGE_REQUEST_SUCCESS]: (state, action) => (false),
  [COMPLAINT_PAGE_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
