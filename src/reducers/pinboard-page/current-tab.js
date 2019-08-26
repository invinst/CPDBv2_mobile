import { handleActions } from 'redux-actions';

import { CHANGE_PINBOARD_TAB } from 'actions/pinboard';


export default handleActions({
  [CHANGE_PINBOARD_TAB]: (state, action) => action.payload,
}, null);
