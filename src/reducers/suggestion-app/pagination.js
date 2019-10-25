import { handleActions } from 'redux-actions';

import {
  SUGGESTION_SINGLE_REQUEST_SUCCESS,
} from 'actions/suggestion';


export default handleActions({
  [SUGGESTION_SINGLE_REQUEST_SUCCESS]: (state, action) => ({ next: action.payload.next }),
}, {});
