import createRequestingReducer from 'reducers/common/requesting';
import {
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'actions/pinboard';


export default createRequestingReducer(
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_FAILURE,
);
