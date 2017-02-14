import { combineReducers } from 'redux';

import pagination from './pagination';
import isRequesting from './is-requesting';
import detail from './detail';


export default combineReducers({
  pagination,
  isRequesting,
  detail
});
