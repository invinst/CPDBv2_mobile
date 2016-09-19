import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import suggestions from './suggestions';
import isSearchFocused from './is-search-focused';
import query from './query';
import isSuccess from './is-success';


export default combineReducers({
  suggestions,
  isRequesting,
  isSearchFocused,
  query,
  isSuccess
});
