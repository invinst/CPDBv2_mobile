import constants from 'constants';
import { v2Url } from 'utils/url-util';
import { get } from 'actions/common/async-action';


export const OFFICERS_REQUEST_START = 'OFFICERS_REQUEST_START';
export const OFFICERS_REQUEST_SUCCESS = 'OFFICERS_REQUEST_SUCCESS';
export const OFFICERS_REQUEST_FAILURE = 'OFFICERS_REQUEST_FAILURE';

export const requestOfficers = (officerIds) => {
  const getOfficers = get(
    v2Url(constants.OFFICERS_API_ENDPOINT),
    [
      OFFICERS_REQUEST_START,
      OFFICERS_REQUEST_SUCCESS,
      OFFICERS_REQUEST_FAILURE
    ]
  );
  return getOfficers({ ids: officerIds });
};
