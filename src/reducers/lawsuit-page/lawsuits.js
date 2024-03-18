import { handleActions } from 'redux-actions';

import { LAWSUIT_FETCH_SUCCESS } from 'actions/lawsuit-page';

const lawsuits = handleActions({
  [LAWSUIT_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      [action.payload.case_no]: action.payload,
    };
  },
}, {});

export default lawsuits;
