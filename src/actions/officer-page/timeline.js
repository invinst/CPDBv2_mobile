import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import constants from 'constants';

export const OFFICER_TIMELINE_ITEMS_REQUEST_START = 'OFFICER_TIMELINE_ITEMS_REQUEST_START';
export const OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS = 'OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS';
export const OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE = 'OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE';

export const getOfficerTimeline = (id) => {
  const getFunc = get(
    v2Url(constants.OFFICER_API_ENDPOINT),
    [
      OFFICER_TIMELINE_ITEMS_REQUEST_START,
      OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
      OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
    ],
  );
  return getFunc({}, undefined, `${id}/new-timeline-items/`, { id });
};
