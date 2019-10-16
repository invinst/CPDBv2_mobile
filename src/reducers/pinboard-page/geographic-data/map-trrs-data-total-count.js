import { handleActions } from 'redux-actions';

import { FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS } from 'actions/pinboard';

export default handleActions({
  [FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload['count'],
}, null);
