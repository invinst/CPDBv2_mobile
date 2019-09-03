import { handleActions } from 'redux-actions';

import {
  OFFICER_COACCUSALS_REQUEST_FAILURE,
  OFFICER_COACCUSALS_REQUEST_SUCCESS,
} from 'actions/officer-page/coaccusals';


export default handleActions({
  [OFFICER_COACCUSALS_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [action.meta.id]: action.payload,
  }),
  [OFFICER_COACCUSALS_REQUEST_FAILURE]: (state, action) => state,
}, {});
