import { handleActions } from 'redux-actions';

import {
  REPORTING_PAGE_REQUEST_START, REPORTING_PAGE_REQUEST_SUCCESS, REPORTING_PAGE_REQUEST_FAILURE
} from 'actions/reporting-page';


const isRequesting = handleActions({
  [REPORTING_PAGE_REQUEST_START]: (state, action) => (true),
  [REPORTING_PAGE_REQUEST_SUCCESS]: (state, action) => (false),
  [REPORTING_PAGE_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
