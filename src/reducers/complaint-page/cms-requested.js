import { handleActions } from 'redux-actions';

import { COMPLAINT_PAGE_CMS_REQUEST_SUCCESS, COMPLAINT_PAGE_CMS_REQUEST_FAILURE } from 'actions/complaint-page';


export default handleActions({
  [COMPLAINT_PAGE_CMS_REQUEST_SUCCESS]: () => true,
  [COMPLAINT_PAGE_CMS_REQUEST_FAILURE]: state => state
}, false);
