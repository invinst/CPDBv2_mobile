import { combineReducers } from 'redux';

import complaints from './complaints';
import attachmentRequest from './attachment-request';


export default combineReducers({
  complaints,
  attachmentRequest
});
