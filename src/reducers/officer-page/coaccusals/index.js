import { combineReducers } from 'redux';

import data from './data';
import isSuccess from './is-success';


export default combineReducers({
  data,
  isSuccess,
});
