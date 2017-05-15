import { handleActions } from 'redux-actions';

import { COMPLAINT_REQUEST_SUCCESS, COMPLAINT_REQUEST_FAILURE } from 'actions/complaint-page';

const complaints = handleActions({
  [COMPLAINT_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      [action.meta.id]: action.payload
    };
  },
  [COMPLAINT_REQUEST_FAILURE]: (state, action) => state
}, {});

export default complaints;
