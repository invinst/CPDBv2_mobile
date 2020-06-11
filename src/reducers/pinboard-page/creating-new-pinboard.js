import createRequestingReducer from 'reducers/common/requesting';
import {
  PINBOARD_CREATE_NEW_REQUEST_START,
  PINBOARD_CREATE_NEW_REQUEST_FAILURE,
  PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
} from 'actions/pinboard';


export default createRequestingReducer(
  PINBOARD_CREATE_NEW_REQUEST_START,
  PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
  PINBOARD_CREATE_NEW_REQUEST_FAILURE,
);
