import { handleActions } from 'redux-actions';

import { PINBOARD_PAGE_CMS_REQUEST_SUCCESS } from 'actions/pinboard';


export default handleActions({
  [PINBOARD_PAGE_CMS_REQUEST_SUCCESS]: (state, action) => action.payload.fields,
}, []);
