import { handleActions } from 'redux-actions';

import {
  NEW_DOCUMENT_ALLEGATIONS_REQUEST_SUCCESS,
  NEW_DOCUMENT_ALLEGATIONS_REQUEST_FAILURE
} from 'actions/landing-page';


export default handleActions({
  [NEW_DOCUMENT_ALLEGATIONS_REQUEST_SUCCESS]: (state, action) => action.payload,
  [NEW_DOCUMENT_ALLEGATIONS_REQUEST_FAILURE]: (state) => state
}, []);
