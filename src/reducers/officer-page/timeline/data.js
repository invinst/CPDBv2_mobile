import { handleActions } from 'redux-actions';

import {
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE
} from 'actions/officer-page/timeline';


export default handleActions({
  [OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [action.meta.id]: action.payload
  }),
  [OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE]: (state, action) => state
}, {});
