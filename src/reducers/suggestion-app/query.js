import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';
import queryString from 'query-string';

import { SEARCH_QUERY_PREFIX_REGEX } from 'constants';
import { SEARCH_INPUT_CHANGED, SEARCH_CLEAR, SEARCH_RESET } from 'actions/suggestion';


const getSearchQuery = (searchText) => {
  return searchText ? searchText.replace(SEARCH_QUERY_PREFIX_REGEX, '') : searchText;
};

export default handleActions({
  [SEARCH_INPUT_CHANGED]: (state, action) => getSearchQuery(action.payload),
  [LOCATION_CHANGE]: (state, action) => {
    const { pathname, search } = action.payload.location;
    const searchQuery = queryString.parse(search);
    return pathname === '/' ? '' : (getSearchQuery(searchQuery.q || searchQuery.terms) || state);
  },
  [SEARCH_CLEAR]: (state, action) => '',
  [SEARCH_RESET]: (state, action) => '',
}, '');
