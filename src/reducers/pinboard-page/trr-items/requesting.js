import createRequestingReducer from 'reducers/common/requesting';
import {
  PINBOARD_TRRS_FETCH_REQUEST_START,
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRRS_FETCH_REQUEST_FAILURE,
} from 'actions/pinboard';

export default createRequestingReducer(
  PINBOARD_TRRS_FETCH_REQUEST_START,
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRRS_FETCH_REQUEST_FAILURE,
);
