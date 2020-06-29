import { combineReducers } from 'redux';

import complaintSummary from './complaint-summary';
import complaintSummaryRequesting from './complaint-summary-requesting';
import trrSummary from './trr-summary';
import trrSummaryRequesting from './trr-summary-requesting';
import officersSummary from './officers-summary';
import officersSummaryRequesting from './officers-summary-requesting';


export default combineReducers({
  complaintSummary,
  complaintSummaryRequesting,
  trrSummary,
  trrSummaryRequesting,
  officersSummary,
  officersSummaryRequesting,
});
