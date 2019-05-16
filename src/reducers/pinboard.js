import { handleActions } from 'redux-actions';

import {
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_SUCCESS,
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
  [PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...action.payload,
    ...state,
    isPinboardRestored: true,
  }),
}, null);
