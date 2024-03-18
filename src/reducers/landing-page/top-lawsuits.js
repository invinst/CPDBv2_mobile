import { handleActions } from 'redux-actions';

import {
  TOP_LAWSUITS_REQUEST_SUCCESS,
} from 'actions/landing-page';


export default handleActions({
  [TOP_LAWSUITS_REQUEST_SUCCESS]: (state, action) => action.payload,
}, []);
