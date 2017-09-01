import { handleActions } from 'redux-actions';

import { UPDATE_CHOSEN_CATEGORY } from 'actions/suggestion';


export default handleActions({
  [UPDATE_CHOSEN_CATEGORY]: (state, action) => {
    return action.payload;
  }
}, '');
