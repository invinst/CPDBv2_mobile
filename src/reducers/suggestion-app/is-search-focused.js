import { handleActions } from 'redux-actions';

import { SEARCH_FOCUS, SEARCH_BLUR, SEARCH_CLEAR, SEARCH_RESET } from 'actions/suggestion';


export default handleActions({
  [SEARCH_FOCUS]: (state, action) => {
    return 1;
  },
  [SEARCH_BLUR]: (state, action) => {
    return 0;
  },
  [SEARCH_CLEAR]: (state, action) => {
    return 0;
  },
  [SEARCH_RESET]: (state, action) => {
    return 0;
  },
}, 0);
