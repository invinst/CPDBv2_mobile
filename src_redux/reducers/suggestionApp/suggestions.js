import { handleActions } from 'redux-actions';

import { SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE } from 'actions/suggestion';

export default handleActions({
  [SUGGESTION_REQUEST_SUCCESS]: (state, action) => {
    return action.payload || [];
  },
  [SUGGESTION_REQUEST_FAILURE]: (state, action) => {
    return [];
  }
}, []);
