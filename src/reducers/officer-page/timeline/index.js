import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import isSuccess from './is-success';
import items from './items';
import filter from './filter';


export default combineReducers({
  isRequesting,
  isSuccess,
  items,
  filter,
});
