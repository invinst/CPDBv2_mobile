import createRequestingReducer from 'reducers/common/requesting';
import {
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'actions/pinboard';

export default createRequestingReducer(
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE,
);
