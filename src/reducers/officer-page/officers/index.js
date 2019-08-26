import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import isSuccess from './is-success';
import data from './data';


export default combineReducers({
  isRequesting,
  isSuccess,
  data,
});
