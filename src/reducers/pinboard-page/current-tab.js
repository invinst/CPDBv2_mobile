import { handleActions } from 'redux-actions';

import { CHANGE_PINBOARD_TAB } from 'actions/pinboard';
import constants from 'constants';


export default handleActions({
  [CHANGE_PINBOARD_TAB]: (state, action) => {
    return action.payload;
  },
}, constants.PINBOARD_PAGE.TAB_NAMES.NETWORK);
