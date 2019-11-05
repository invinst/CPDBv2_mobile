import { handleActions } from 'redux-actions';
import constants from 'constants';

import {
  SUGGESTION_REQUEST_SUCCESS,
  SUGGESTION_REQUEST_FAILURE,
  SUGGEST_ALL_REQUEST_SUCCESS,
  SUGGEST_ALL_REQUEST_FAILURE,
} from 'actions/suggestion';

const categories = constants.SEARCH_CATEGORIES.map((cat) => cat.path);

const defaultState = {};

categories.forEach((category) => {
  defaultState[category] = [];
});

export default handleActions({
  [SUGGESTION_REQUEST_SUCCESS]: (state, action) => {
    const suggestions = {};
    categories.forEach((category) => suggestions[category] = action.payload[category] || []);
    return suggestions;
  },
  [SUGGESTION_REQUEST_FAILURE]: (state, action) => ({}),
  [SUGGEST_ALL_REQUEST_SUCCESS]: (state, action) => {
    const category = Object.keys(action.payload)[0];

    return {
      ...state,
      [category]: action.payload[category],
    };
  },
  [SUGGEST_ALL_REQUEST_FAILURE]: (state, action) => ({}),
}, defaultState);
