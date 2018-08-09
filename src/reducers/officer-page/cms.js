import { handleActions } from 'redux-actions';

import { OFFICER_PAGE_CMS_REQUEST_SUCCESS, OFFICER_PAGE_CMS_REQUEST_FAILURE } from 'actions/officer-page';


export default handleActions({
  [OFFICER_PAGE_CMS_REQUEST_SUCCESS]: (state, action) => action.payload.fields,
  [OFFICER_PAGE_CMS_REQUEST_FAILURE]: state => state
}, []);
