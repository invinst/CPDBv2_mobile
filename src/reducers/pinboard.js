import { get } from 'lodash';
import { handleActions } from 'redux-actions';

import {
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
  PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
} from 'actions/pinboard';


export default handleActions({
  [PINBOARD_CREATE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    ownedByCurrentUser: true
  }),
  [PINBOARD_UPDATE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    ownedByCurrentUser: state.ownedByCurrentUser
  }),
  [PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    ownedByCurrentUser:
      get(state, 'ownedByCurrentUser', false) &&
      get(state, 'id', null) === action.payload.id,
  }),
  [PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    'crItems': action.payload,
  }),
  [PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    'officerItems': action.payload,
  }),
  [PINBOARD_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    'trrItems': action.payload,
  })
}, null);
