import { handleActions } from 'redux-actions';

import { TRR_PAGE_CMS_REQUEST_SUCCESS, TRR_PAGE_CMS_REQUEST_FAILURE } from 'actions/trr-page';


export default handleActions({
  [TRR_PAGE_CMS_REQUEST_SUCCESS]: (state, action) => action.payload.fields,
  [TRR_PAGE_CMS_REQUEST_FAILURE]: state => state
}, []);
