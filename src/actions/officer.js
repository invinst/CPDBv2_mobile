import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import constants from 'constants';


export const OFFICER_REQUEST_START = 'OFFICER_REQUEST_START';
export const OFFICER_REQUEST_SUCCESS = 'OFFICER_REQUEST_SUCCESS';
export const OFFICER_REQUEST_FAILURE = 'OFFICER_REQUEST_FAILURE';

export const fetchOfficer = (id) => {
  const getFunc = get(
    v2Url(constants.OFFICER_API_ENDPOINT),
    [
      OFFICER_REQUEST_START,
      OFFICER_REQUEST_SUCCESS,
      OFFICER_REQUEST_FAILURE
    ]
  );

  return getFunc({}, undefined, `${id}/`);
};
