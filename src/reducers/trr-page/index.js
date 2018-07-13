import { combineReducers } from 'redux';

import trrs from './trrs';
import notFound from './not-found';
import attachmentRequest from './attachment-request';


export default combineReducers({
  trrs,
  notFound,
  attachmentRequest
});
