import { handleActions } from 'redux-actions';

import { TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE } from 'actions/trr-page';

const trrs = handleActions({
  [TRR_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      [action.meta.id]: action.payload,
    };
  },
  [TRR_REQUEST_FAILURE]: (state, action) => state,
}, {});

export default trrs;
