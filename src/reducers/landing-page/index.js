import { combineReducers } from 'redux';

import aboutSection from './about-section';
import collaborateSection from './collaborate-section';
import cms from './cms';
import topOfficersByAllegation from './top-officers-by-allegation';
import recentActivities from './recent-activities';
import newDocumentAllegations from './new-document-allegations';
import complaintSummaries from './complaint-summaries';

export default combineReducers({
  aboutSection,
  collaborateSection,
  cms,
  topOfficersByAllegation,
  recentActivities,
  newDocumentAllegations,
  complaintSummaries
});
