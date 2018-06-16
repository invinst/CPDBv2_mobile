import { handleActions } from 'redux-actions';

import { SEARCH_INPUT_CHANGED, SEARCH_CLEAR, SEARCH_RESET } from 'actions/suggestion';


export default handleActions({
  [SEARCH_INPUT_CHANGED]: (state, action) => {
    return action.payload;
  },
  [SEARCH_CLEAR]: (state, action) => {
    return '';
  },
  [SEARCH_RESET]: (state, action) => {
    return '';
  }
}, '');
