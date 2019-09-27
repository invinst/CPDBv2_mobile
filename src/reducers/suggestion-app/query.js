import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';

import constants from 'constants';
import { SEARCH_INPUT_CHANGED, SEARCH_CLEAR, SEARCH_RESET } from 'actions/suggestion';


const getSearchQuery = (searchText) => {
  return searchText ? searchText.replace(constants.SEARCH_QUERY_PREFIX_REGEX, '') : searchText;
};

export default handleActions({
  [SEARCH_INPUT_CHANGED]: (state, action) => getSearchQuery(action.payload),
  [LOCATION_CHANGE]: (state, action) => getSearchQuery(action.payload.query.terms) || '',
  [SEARCH_CLEAR]: (state, action) => '',
  [SEARCH_RESET]: (state, action) => '',
}, '');
