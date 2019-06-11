import { handleActions } from 'redux-actions';

import { PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS } from 'actions/pinboard';

export default handleActions({
  [PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload
}, []);
