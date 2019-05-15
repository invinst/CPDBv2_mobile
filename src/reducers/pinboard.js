import { handleActions } from 'redux-actions';

import {
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
  PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
} from 'actions/pinboard';


export default handleActions({
  [PINBOARD_CREATE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [PINBOARD_UPDATE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    crItems: action.payload,
  }),
  [PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    officerItems: action.payload,
  }),
  [PINBOARD_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    trrItems: action.payload,
  }),
  [PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...action.payload,
    ...state,
    isPinboardRestored: true,
  }),
}, null);
