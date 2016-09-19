import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import officer from './officer';
import isSuccess from './is-success';


export default combineReducers({
  officer,
  isRequesting,
  isSuccess
});
