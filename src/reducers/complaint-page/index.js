import { combineReducers } from 'redux';

import complaints from './complaints';
import notFound from './not-found';
import attachmentRequest from './attachment-request';


export default combineReducers({
  complaints,
  notFound,
  attachmentRequest
});
