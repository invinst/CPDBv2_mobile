import { handleActions } from 'redux-actions';

import {
  OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
  OFFICER_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
} from 'actions/officer-page/timeline';


const isSuccess = handleActions({
  [OFFICER_TIMELINE_ITEMS_REQUEST_START]: (state, action) => (true),
  [OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, action) => (true),
  [OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE]: (state, action) => (false),
}, false);

export default isSuccess;
