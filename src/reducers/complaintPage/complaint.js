import { handleActions } from 'redux-actions';

import { COMPLAINT_PAGE_REQUEST_SUCCESS, COMPLAINT_PAGE_REQUEST_FAILURE } from 'actions/complaint';

const complaint = handleActions({
  [COMPLAINT_PAGE_REQUEST_SUCCESS]: (state, action) => {
    return action.payload || {};
  },
  [COMPLAINT_PAGE_REQUEST_FAILURE]: (state, action) => {
    return {};
  }
}, {});

export default complaint;
