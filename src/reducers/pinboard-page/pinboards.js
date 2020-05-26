import { handleActions } from 'redux-actions';

import { PINBOARDS_FETCH_REQUEST_SUCCESS } from 'actions/pinboard';

export default handleActions({
  [PINBOARDS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
}, []);
