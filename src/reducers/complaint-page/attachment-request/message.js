import { handleActions } from 'redux-actions';

import {
  COMPLAINT_REQUEST_DOC_REQUEST_START, COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS, COMPLAINT_REQUEST_DOC_REQUEST_FAILURE,
} from 'actions/complaint-page';


const message = handleActions({
  [COMPLAINT_REQUEST_DOC_REQUEST_START]: (state, action) => '',
  [COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS]: (state, action) => action.payload.message,
  [COMPLAINT_REQUEST_DOC_REQUEST_FAILURE]: (state, action) => action.payload.message,
}, '');

export default message;
