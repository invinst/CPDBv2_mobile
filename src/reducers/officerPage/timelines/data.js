import { handleActions } from 'redux-actions';

import { OFFICER_TIMELINE_REQUEST_SUCCESS, OFFICER_TIMELINE_REQUEST_FAILURE } from 'actions/officer';

const timelines = handleActions({
  [OFFICER_TIMELINE_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      [action.meta.id]: action.payload
    };
  },
  [OFFICER_TIMELINE_REQUEST_FAILURE]: (state, action) => state
}, {});

export default timelines;
