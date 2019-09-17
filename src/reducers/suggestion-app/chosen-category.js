import { handleActions } from 'redux-actions';
import { invert } from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';

import constants from 'constants';
import { UPDATE_CHOSEN_CATEGORY, SEARCH_INPUT_CHANGED } from 'actions/suggestion';


const getChosenCategory = (query) => {
  const matchResult = (query || '').match(constants.SEARCH_QUERY_PREFIX_REGEX);
  return matchResult ? SEARCH_CATEGORY_PREFIXES_INVERT[matchResult[1]] : '';
};

const SEARCH_CATEGORY_PREFIXES_INVERT = invert(constants.SEARCH_CATEGORY_PREFIXES);

export default handleActions({
  [UPDATE_CHOSEN_CATEGORY]: (state, action) => action.payload,
  [SEARCH_INPUT_CHANGED]: (state, action) => getChosenCategory(action.payload),
  [LOCATION_CHANGE]: (state, action) => getChosenCategory(action.payload.query.terms),
}, '');
