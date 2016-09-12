import { handleActions } from 'redux-actions';

import { OFFICER_PAGE_REQUEST_SUCCESS, OFFICER_PAGE_REQUEST_FAILURE } from 'actions/officer';

const officer = handleActions({
  [OFFICER_PAGE_REQUEST_SUCCESS]: (state, action) => {
    return action.payload || {};
  },
  [OFFICER_PAGE_REQUEST_FAILURE]: (state, action) => {
    return {};
  }
}, {});

export default officer;
