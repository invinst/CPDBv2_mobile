import { createAction } from 'redux-actions';
import { get } from 'actions/common/async-action';
import { v1Url } from 'utils/UrlUtil';

import constants from 'constants';


export const COMPLAINT_PAGE_REQUEST_START = 'COMPLAINT_PAGE_REQUEST_START';
export const COMPLAINT_PAGE_REQUEST_SUCCESS = 'COMPLAINT_PAGE_REQUEST_SUCCESS';
export const COMPLAINT_PAGE_REQUEST_FAILURE = 'COMPLAINT_PAGE_REQUEST_FAILURE';

export const COMPLAINT_PAGE_TOGGLE_OPEN = 'COMPLAINT_PAGE_TOGGLE_OPEN';
export const COMPLAINT_PAGE_TOGGLE_CLOSE = 'COMPLAINT_PAGE_TOGGLE_CLOSE';

export const getComplaint = get(
  v1Url(constants.ALLEGATION_API_ENDPOINT),
  [COMPLAINT_PAGE_REQUEST_START, COMPLAINT_PAGE_REQUEST_SUCCESS, COMPLAINT_PAGE_REQUEST_FAILURE]
);
export const toggleOpen = createAction(COMPLAINT_PAGE_TOGGLE_OPEN);
export const toggleClose = createAction(COMPLAINT_PAGE_TOGGLE_CLOSE);
