import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import constants from 'constants';

export const TRR_REQUEST_START = 'TRR_REQUEST_START';
export const TRR_REQUEST_SUCCESS = 'TRR_REQUEST_SUCCESS';
export const TRR_REQUEST_FAILURE = 'TRR_REQUEST_FAILURE';

export const requestTRR = (id) => get(
  v2Url(constants.TRR_API_ENDPOINT),
  [
    TRR_REQUEST_START,
    TRR_REQUEST_SUCCESS,
    TRR_REQUEST_FAILURE
  ]
)(undefined, undefined, `${id}/`, { id });
