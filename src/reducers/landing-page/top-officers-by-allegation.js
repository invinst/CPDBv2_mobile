import { handleActions } from 'redux-actions';

import {
  TOP_OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS,
  TOP_OFFICERS_BY_ALLEGATION_REQUEST_FAILURE
} from 'actions/landing-page';


export default handleActions({
  [TOP_OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS]: (state, action) => action.payload,
  [TOP_OFFICERS_BY_ALLEGATION_REQUEST_FAILURE]: (state, action) => state
}, []);
