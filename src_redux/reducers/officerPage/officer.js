import { handleActions } from 'redux-actions';

import { OFFICER_PAGE_REQUEST_SUCCESS, OFFICER_PAGE_REQUEST_FAILURE } from 'actions/officer';

export default handleActions({
  [OFFICER_PAGE_REQUEST_SUCCESS]: (state, action) => {
    return action.payload || {};
  },
  [OFFICER_PAGE_REQUEST_FAILURE]: (state, action) => {
    return {};
  }
}, {});
