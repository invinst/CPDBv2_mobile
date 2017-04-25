import { combineReducers } from 'redux';

import complaints from './complaints';
import isSuccess from './is-success';


export default combineReducers({
  complaints,
  isSuccess
});
