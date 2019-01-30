import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';

import { SEARCH_INPUT_CHANGED, SEARCH_CLEAR, SEARCH_RESET } from 'actions/suggestion';


export default handleActions({
  [SEARCH_INPUT_CHANGED]: (state, action) => {
    return action.payload;
  },
  [LOCATION_CHANGE]: (state, action) => {
    return action.payload.query.terms || '';
  },
  [SEARCH_CLEAR]: (state, action) => {
    return '';
  },
  [SEARCH_RESET]: (state, action) => {
    return '';
  }
}, '');
