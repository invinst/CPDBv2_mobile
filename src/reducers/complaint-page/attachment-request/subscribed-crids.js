import { handleActions } from 'redux-actions';

import { COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS } from 'actions/complaint-page';


const subscribedCRIds = handleActions({
  [COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS]: (state, { payload }) => ({ ...state, [payload.crid]: true }),
}, {});

export default subscribedCRIds;
