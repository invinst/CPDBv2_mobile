import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/UrlUtil';
import constants from 'constants';

export const COMPLAINT_REQUEST_START = 'COMPLAINT_REQUEST_START';
export const COMPLAINT_REQUEST_SUCCESS = 'COMPLAINT_REQUEST_SUCCESS';
export const COMPLAINT_REQUEST_FAILURE = 'COMPLAINT_REQUEST_FAILURE';

export const requestComplaint = (id) => get(
  v2Url(constants.COMPLAINT_API_ENDPOINT),
  [
    COMPLAINT_REQUEST_START,
    COMPLAINT_REQUEST_SUCCESS,
    COMPLAINT_REQUEST_FAILURE
  ]
)(undefined, undefined, `${id}/`, { id });
