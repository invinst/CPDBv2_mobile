import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import isSuccess from './is-success';
import data from './data';
import filter from './filter';


export default combineReducers({
  isRequesting,
  isSuccess,
  data,
  filter,
});
