import { handleActions } from 'redux-actions';
import { invert } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import queryString from 'query-string';

import { SEARCH_QUERY_PREFIX_REGEX, SEARCH_CATEGORY_PREFIXES } from 'constants';
import { UPDATE_CHOSEN_CATEGORY, SEARCH_INPUT_CHANGED } from 'actions/suggestion';


const getChosenCategory = (query) => {
  const matchResult = (query || '').match(SEARCH_QUERY_PREFIX_REGEX);
  return matchResult ? SEARCH_CATEGORY_PREFIXES_INVERT[matchResult[1]] : '';
};

const SEARCH_CATEGORY_PREFIXES_INVERT = invert(SEARCH_CATEGORY_PREFIXES);

export default handleActions({
  [UPDATE_CHOSEN_CATEGORY]: (state, action) => action.payload,
  [SEARCH_INPUT_CHANGED]: (state, action) => getChosenCategory(action.payload),
  [LOCATION_CHANGE]: (state, action) => {
    const query = queryString.parse(action.payload.location.search);
    return getChosenCategory(query.q || query.terms);
  },
}, '');
