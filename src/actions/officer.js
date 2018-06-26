import { get, getUrl } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import constants from 'constants';


export const OFFICER_SUMMARY_REQUEST_START = 'OFFICER_SUMMARY_REQUEST_START';
export const OFFICER_SUMMARY_REQUEST_SUCCESS = 'OFFICER_SUMMARY_REQUEST_SUCCESS';
export const OFFICER_SUMMARY_REQUEST_FAILURE = 'OFFICER_SUMMARY_REQUEST_FAILURE';

export const getOfficerSummary = (id) => {
  const getFunc = get(
    v2Url(constants.OFFICER_API_ENDPOINT),
    [
      OFFICER_SUMMARY_REQUEST_START,
      OFFICER_SUMMARY_REQUEST_SUCCESS,
      OFFICER_SUMMARY_REQUEST_FAILURE
    ]
  );

  return getFunc({}, undefined, `${id}/summary/`);
};


export const OFFICER_TIMELINE_REQUEST_START = 'OFFICER_TIMELINE_REQUEST_START';
export const OFFICER_TIMELINE_REQUEST_SUCCESS = 'OFFICER_TIMELINE_REQUEST_SUCCESS';
export const OFFICER_TIMELINE_REQUEST_FAILURE = 'OFFICER_TIMELINE_REQUEST_FAILURE';

export const getOfficerTimeline = (id) => {
  const getFunc = get(
    v2Url(constants.OFFICER_API_ENDPOINT),
    [
      OFFICER_TIMELINE_REQUEST_START,
      OFFICER_TIMELINE_REQUEST_SUCCESS,
      OFFICER_TIMELINE_REQUEST_FAILURE
    ]
  );

  return getFunc({}, undefined, `${id}/timeline-items/`, { id });
};

export const getMoreOfficerTimeline = (id, url) => getUrl(
  url,
  [
    '_SKIP',
    OFFICER_TIMELINE_REQUEST_SUCCESS,
    OFFICER_TIMELINE_REQUEST_FAILURE
  ],
  { id }
);
