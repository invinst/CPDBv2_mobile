import { combineReducers } from 'redux';

import complaints from './complaints';
import notFound from './not-found';


export default combineReducers({
  complaints,
  notFound
});
