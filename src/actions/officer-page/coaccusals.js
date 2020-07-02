import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import { OFFICER_API_ENDPOINT } from 'constants';

export const OFFICER_COACCUSALS_REQUEST_START = 'OFFICER_COACCUSALS_REQUEST_START';
export const OFFICER_COACCUSALS_REQUEST_SUCCESS = 'OFFICER_COACCUSALS_REQUEST_SUCCESS';
export const OFFICER_COACCUSALS_REQUEST_FAILURE = 'OFFICER_COACCUSALS_REQUEST_FAILURE';

export const getOfficerCoaccusals = (id) => {
  const getFunc = get(
    v2Url(OFFICER_API_ENDPOINT),
    [
      OFFICER_COACCUSALS_REQUEST_START,
      OFFICER_COACCUSALS_REQUEST_SUCCESS,
      OFFICER_COACCUSALS_REQUEST_FAILURE,
    ],
  );
  return getFunc({}, undefined, `${id}/coaccusals/`, { id });
};
