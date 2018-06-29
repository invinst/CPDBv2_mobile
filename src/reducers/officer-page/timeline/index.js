import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import isSuccess from './is-success';
import items from './items';


export default combineReducers({
  isRequesting,
  isSuccess,
  items,
});
