import { handleActions } from 'redux-actions';

import { OFFICER_TIMELINE_REQUEST_SUCCESS, OFFICER_TIMELINE_REQUEST_FAILURE } from 'actions/officer';

const timelines = handleActions({
  [OFFICER_TIMELINE_REQUEST_SUCCESS]: (state, action) => {
    const newTimeline = action.payload;
    const currentTimeline = state[action.meta.id] || {};
    return {
      ...state,
      [action.meta.id]: {
        count: newTimeline.count,
        previous: newTimeline.previous,
        next: newTimeline.next,
        results: [
          ...currentTimeline.results || [],
          ...newTimeline.results
        ]
      }
    };
  },
  [OFFICER_TIMELINE_REQUEST_FAILURE]: (state, action) => state
}, {});

export default timelines;
