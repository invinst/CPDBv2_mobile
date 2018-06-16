import { handleActions } from 'redux-actions';

import { OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE } from 'actions/officer';

const summaries = handleActions({
  [OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.id]: action.payload
  }),
  [OFFICER_SUMMARY_REQUEST_FAILURE]: (state, action) => state
}, {});

export default summaries;
