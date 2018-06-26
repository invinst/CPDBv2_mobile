import { createAction } from 'redux-actions';

import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import constants from 'constants';

export const OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START = 'OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START';
export const OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS = 'OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS';
export const OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE = 'OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE';
export const OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER = 'OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER';

export const getOfficerTimeline = (id) => {
  const getFunc = get(
    v2Url(constants.OFFICER_API_ENDPOINT),
    [
      OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
      OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
      OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE,
    ],
  );

  return getFunc({}, undefined, `${id}/new-timeline-items/`, { id });
};

export const changeFilter = createAction(OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER);
