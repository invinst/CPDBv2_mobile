import { handleActions } from 'redux-actions';

import {
  RECENT_ACTIVITIES_REQUEST_SUCCESS,
  RECENT_ACTIVITIES_REQUEST_FAILURE,
} from 'actions/landing-page';


export default handleActions({
  [RECENT_ACTIVITIES_REQUEST_SUCCESS]: (state, action) => action.payload,
  [RECENT_ACTIVITIES_REQUEST_FAILURE]: (state, action) => state,
}, []);
