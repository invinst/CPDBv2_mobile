import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';
import queryString from 'query-string';

import constants from 'constants';
import { SEARCH_INPUT_CHANGED, SEARCH_CLEAR, SEARCH_RESET } from 'actions/suggestion';


const getSearchQuery = (searchText) => {
  return searchText ? searchText.replace(constants.SEARCH_QUERY_PREFIX_REGEX, '') : searchText;
};

export default handleActions({
  [SEARCH_INPUT_CHANGED]: (state, action) => getSearchQuery(action.payload),
  [LOCATION_CHANGE]: (state, action) => {
    const { pathname, search } = action.payload.location;
    return pathname === '/' ? '' : (getSearchQuery(queryString.parse(search).q) || state);
  },
  [SEARCH_CLEAR]: (state, action) => '',
  [SEARCH_RESET]: (state, action) => '',
}, '');
