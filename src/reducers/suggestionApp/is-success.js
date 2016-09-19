import { handleActions } from 'redux-actions';

import { SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE } from 'actions/suggestion';


const isSuccess = handleActions({
  [SUGGESTION_REQUEST_SUCCESS]: (state, action) => (true),
  [SUGGESTION_REQUEST_FAILURE]: (state, action) => (false)
}, true);

export default isSuccess;
