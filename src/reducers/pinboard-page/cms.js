import { handleActions } from 'redux-actions';

import { PINBOARD_PAGE_CMS_REQUEST_SUCCESS, PINBOARD_PAGE_CMS_REQUEST_FAILURE } from 'actions/pinboard';


export default handleActions({
  [PINBOARD_PAGE_CMS_REQUEST_SUCCESS]: (state, action) => action.payload.fields,
  [PINBOARD_PAGE_CMS_REQUEST_FAILURE]: state => state
}, []);
