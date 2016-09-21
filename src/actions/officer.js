import { get } from 'actions/common/async-action';
import { v1Url } from 'utils/UrlUtil';
import constants from 'constants';


export const OFFICER_PAGE_REQUEST_START = 'OFFICER_PAGE_REQUEST_START';
export const OFFICER_PAGE_REQUEST_SUCCESS = 'OFFICER_PAGE_REQUEST_SUCCESS';
export const OFFICER_PAGE_REQUEST_FAILURE = 'OFFICER_PAGE_REQUEST_FAILURE';

export const getOfficer = get(
  v1Url(constants.OFFICER_API_ENDPOINT),
  [OFFICER_PAGE_REQUEST_START, OFFICER_PAGE_REQUEST_SUCCESS, OFFICER_PAGE_REQUEST_FAILURE]
);
