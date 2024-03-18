import { handleActions } from 'redux-actions';
import { kebabCase } from 'lodash';

import { OFFICER_REQUEST_SUCCESS } from 'actions/officer-page';
import { COMPLAINT_REQUEST_SUCCESS } from 'actions/complaint-page';
import { TRR_REQUEST_SUCCESS } from 'actions/trr-page';
import { LAWSUIT_FETCH_SUCCESS } from 'actions/lawsuit-page';
import {
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
} from 'actions/pinboard';


const buildPinboardBreadcrumbs = (state, action) => {
  const title = action.payload['title'];
  return {
    ...state,
    [`/pinboard/${action.payload['id']}/`]: title ? `Pinboard - ${title}` : 'Pinboard',
  };
};

const breadcrumbMapping = handleActions({
  [COMPLAINT_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/complaint/${action.payload.crid}/`]: `CR ${action.payload.crid}`,
  }),
  [OFFICER_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/officer/${action.payload['officer_id']}/${kebabCase(action.payload['full_name'])}/`]:
      action.payload['full_name'],
  }),
  [TRR_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`/trr/${action.payload.id}/`]: `TRR ${action.payload.id}`,
  }),
  [LAWSUIT_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    [`/lawsuit/${action.payload['case_no']}/`]: `Case ${action.payload['case_no']}`,
  }),
  [PINBOARD_CREATE_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
  [PINBOARD_FETCH_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
  [PINBOARD_UPDATE_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
  [PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: buildPinboardBreadcrumbs,
}, {});

export default breadcrumbMapping;
