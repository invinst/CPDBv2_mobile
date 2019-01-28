import { combineReducers } from 'redux';

import trrs from './trrs';
import attachmentRequest from './attachment-request';


export default combineReducers({
  trrs,
  attachmentRequest
});
