import { combineReducers } from 'redux';

import complaintSummary from './complaint-summary';
import complaintSummaryRequesting from './complaint-summary-requesting';


export default combineReducers({
  complaintSummary,
  complaintSummaryRequesting,
});
