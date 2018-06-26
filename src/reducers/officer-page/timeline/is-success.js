import { handleActions } from 'redux-actions';

import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE
} from 'actions/officer-page/timeline';
import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
} from 'actions/officer-page/timeline';


const isSuccess = handleActions({
  [OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START]: (state, action) => (true),
  [OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, action) => (true),
  [OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE]: (state, action) => (false)
}, true);

export default isSuccess;
