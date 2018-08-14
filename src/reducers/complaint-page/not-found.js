import { handleActions } from 'redux-actions';

import {
  COMPLAINT_REQUEST_START,
  COMPLAINT_REQUEST_SUCCESS,
  COMPLAINT_REQUEST_FAILURE
} from 'actions/officer-page';


const notFound = handleActions({
  [COMPLAINT_REQUEST_START]: (state, action) => (false),
  [COMPLAINT_REQUEST_SUCCESS]: (state, action) => (false),
  [COMPLAINT_REQUEST_FAILURE]: (state, action) => (true)
}, false);

export default notFound;
