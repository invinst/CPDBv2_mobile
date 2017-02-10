import { get } from 'actions/common/async-action';
import { v2v2Url } from 'utils/UrlUtil';
import constants from 'constants';


export const LANDING_PAGE_API_URL = constants.LANDING_PAGE_API_ENDPOINT;

export const LANDING_PAGE_REQUEST_START = 'LANDING_PAGE_REQUEST_START';
export const LANDING_PAGE_REQUEST_SUCCESS = 'LANDING_PAGE_REQUEST_SUCCESS';
export const LANDING_PAGE_REQUEST_FAILURE = 'LANDING_PAGE_REQUEST_FAILURE';

export const requestLandingPage = () => (get(v2v2Url(LANDING_PAGE_API_URL), [
  LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE]
)());
