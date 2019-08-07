import { handleActions } from 'redux-actions';

import { COMPLAINT_PAGE_CMS_REQUEST_SUCCESS } from 'actions/complaint-page';


export default handleActions({
  [COMPLAINT_PAGE_CMS_REQUEST_SUCCESS]: () => true,
}, false);
