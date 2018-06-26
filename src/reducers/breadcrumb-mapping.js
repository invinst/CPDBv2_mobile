import { handleActions } from 'redux-actions';

import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'actions/officer';
import { COMPLAINT_REQUEST_SUCCESS } from 'actions/complaint-page';
import { TRR_REQUEST_SUCCESS } from 'actions/trr-page';


const breadcrumbMapping = handleActions({
  [COMPLAINT_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`complaint/${action.payload.crid}/`]: `CR ${action.payload.complaintId}`
  }),
  [OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`officer/${action.payload.id}/`]: action.payload['full_name']
  }),
  [TRR_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [`trr/${action.payload.id}/`]: `TRR ${action.payload.id}`
  }),
}, {});

export default breadcrumbMapping;
