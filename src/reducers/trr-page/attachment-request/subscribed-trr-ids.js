import { handleActions } from 'redux-actions';

import { TRR_REQUEST_DOC_REQUEST_SUCCESS } from 'actions/trr-page';


const subscribedTRRIds = handleActions({
  [TRR_REQUEST_DOC_REQUEST_SUCCESS]: (state, { payload }) => ({ ...state, [payload['trr_id']]: true }),
}, {});

export default subscribedTRRIds;
