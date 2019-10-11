import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import suggestions from './suggestions';
import isSearchFocused from './is-search-focused';
import query from './query';
import isSuccess from './is-success';
import initialSuggestions from './initial-suggestions';
import activeCategory from './active-category';
import chosenCategory from './chosen-category';
import recentSuggestionsRequested from './recent-suggestions-requested';
import pagination from './pagination';


export default combineReducers({
  suggestions,
  isRequesting,
  isSearchFocused,
  query,
  isSuccess,
  initialSuggestions,
  activeCategory,
  chosenCategory,
  recentSuggestionsRequested,
  pagination,
});
