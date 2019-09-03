import { handleActions } from 'redux-actions';

import {
  COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
  COMPLAINT_SUMMARIES_REQUEST_FAILURE,
} from 'actions/landing-page';


export default handleActions({
  [COMPLAINT_SUMMARIES_REQUEST_SUCCESS]: (state, action) => action.payload,
  [COMPLAINT_SUMMARIES_REQUEST_FAILURE]: (state) => state,
}, []);
