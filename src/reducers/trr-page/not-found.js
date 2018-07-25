import { handleActions } from 'redux-actions';

import {
  TRR_REQUEST_START,
  TRR_REQUEST_SUCCESS,
  TRR_REQUEST_FAILURE
} from 'actions/trr-page';


const notFound = handleActions({
  [TRR_REQUEST_START]: (state, action) => (false),
  [TRR_REQUEST_SUCCESS]: (state, action) => (false),
  [TRR_REQUEST_FAILURE]: (state, action) => (true)
}, false);

export default notFound;
