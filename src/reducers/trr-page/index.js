import { combineReducers } from 'redux';

import trrs from './trrs';
import attachmentRequest from './attachment-request';
import cms from './cms';
import cmsRequested from './cms-requested';


export default combineReducers({
  trrs,
  attachmentRequest,
  cms,
  cmsRequested
});
