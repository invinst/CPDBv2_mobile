import { handleActions } from 'redux-actions';

import {
  SEARCH_SAVE_TO_RECENT,
} from 'actions/suggestion';

export default handleActions({
  [SEARCH_SAVE_TO_RECENT]: (state, action) => {
    const newData = state.filter((datum) => {
      return datum.type !== action.payload.type;
    });
    newData.push(action.payload);
    return newData;
  },
}, []);
