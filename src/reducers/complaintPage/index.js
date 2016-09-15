import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import complaint from './complaint';
import isSuccess from './is-success';
import toggle from './toggle';


export default combineReducers({
  complaint,
  toggle,
  isRequesting,
  isSuccess
});
