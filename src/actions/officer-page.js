import { createAction } from 'redux-actions';

import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import { OFFICER_API_ENDPOINT, OFFICER_PAGE_CMS_API_ENDPOINT } from 'constants';
import { RESET_TIME_LINE_FILTER } from 'constants/officer-page';


export const OFFICER_REQUEST_START = 'OFFICER_REQUEST_START';
export const OFFICER_REQUEST_SUCCESS = 'OFFICER_REQUEST_SUCCESS';
export const OFFICER_REQUEST_FAILURE = 'OFFICER_REQUEST_FAILURE';

export const fetchOfficer = (id) => {
  const getFunc = get(
    v2Url(OFFICER_API_ENDPOINT),
    [
      OFFICER_REQUEST_START,
      OFFICER_REQUEST_SUCCESS,
      OFFICER_REQUEST_FAILURE,
    ]
  );

  return getFunc({}, undefined, `${id}/`, { id: id });
};

export const OFFICER_PAGE_CMS_REQUEST_START = 'OFFICER_PAGE_CMS_REQUEST_START';
export const OFFICER_PAGE_CMS_REQUEST_SUCCESS = 'OFFICER_PAGE_CMS_REQUEST_SUCCESS';
export const OFFICER_PAGE_CMS_REQUEST_FAILURE = 'OFFICER_PAGE_CMS_REQUEST_FAILURE';

export const requestCMS = get(v2Url(OFFICER_PAGE_CMS_API_ENDPOINT), [
  OFFICER_PAGE_CMS_REQUEST_START, OFFICER_PAGE_CMS_REQUEST_SUCCESS, OFFICER_PAGE_CMS_REQUEST_FAILURE,
]);

export const resetTimelineFilter = createAction(RESET_TIME_LINE_FILTER);
