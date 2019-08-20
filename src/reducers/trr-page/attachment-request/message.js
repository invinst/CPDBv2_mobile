import { handleActions } from 'redux-actions';

import {
  TRR_REQUEST_DOC_REQUEST_START,
  TRR_REQUEST_DOC_REQUEST_SUCCESS,
  TRR_REQUEST_DOC_REQUEST_FAILURE,
} from 'actions/trr-page';


const message = handleActions({
  [TRR_REQUEST_DOC_REQUEST_START]: (state, action) => '',
  [TRR_REQUEST_DOC_REQUEST_SUCCESS]: (state, action) => action.payload.message,
  [TRR_REQUEST_DOC_REQUEST_FAILURE]: (state, action) => action.payload.message,
}, '');

export default message;
