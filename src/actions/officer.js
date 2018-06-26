import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import constants from 'constants';


export const OFFICER_SUMMARY_REQUEST_START = 'OFFICER_SUMMARY_REQUEST_START';
export const OFFICER_SUMMARY_REQUEST_SUCCESS = 'OFFICER_SUMMARY_REQUEST_SUCCESS';
export const OFFICER_SUMMARY_REQUEST_FAILURE = 'OFFICER_SUMMARY_REQUEST_FAILURE';

export const getOfficerSummary = (id) => {
  const getFunc = get(
    v2Url(constants.OLD_OFFICER_API_ENDPOINT),
    [
      OFFICER_SUMMARY_REQUEST_START,
      OFFICER_SUMMARY_REQUEST_SUCCESS,
      OFFICER_SUMMARY_REQUEST_FAILURE
    ]
  );

  return getFunc({}, undefined, `${id}/summary/`);
};
