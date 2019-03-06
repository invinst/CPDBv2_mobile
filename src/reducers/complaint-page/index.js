import { combineReducers } from 'redux';

import complaints from './complaints';
import attachmentRequest from './attachment-request';
import cms from './cms';
import cmsRequested from './cms-requested';


export default combineReducers({
  complaints,
  attachmentRequest,
  cms,
  cmsRequested,
});
