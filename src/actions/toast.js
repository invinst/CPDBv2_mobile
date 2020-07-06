import { TOAST_API_ENDPOINT } from 'constants';
import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';


export const TOAST_REQUEST_START = 'TOAST_REQUEST_START';
export const TOAST_REQUEST_SUCCESS = 'TOAST_REQUEST_SUCCESS';
export const TOAST_REQUEST_FAILURE = 'TOAST_REQUEST_FAILURE';

export const fetchToast = get(
  v2Url(TOAST_API_ENDPOINT),
  [
    TOAST_REQUEST_START,
    TOAST_REQUEST_SUCCESS,
    TOAST_REQUEST_FAILURE,
  ]
);
