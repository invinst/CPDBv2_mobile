import { handleActions } from 'redux-actions';

import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE
} from 'actions/officer-page/timeline';


export default handleActions({
  [OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, action) => {
    return action.payload;
  },
  [OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE]: (state, action) => state
}, []);
