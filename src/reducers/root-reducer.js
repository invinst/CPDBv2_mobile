import { combineReducers } from 'redux';
import { reducer as breadcrumb } from 'redux-breadcrumb-trail';

import suggestionApp from './suggestion-app';
import officerPage from './officer-page';
import landingPage from './landing-page';
import complaintPage from './complaint-page';
import trrPage from './trr-page';
import breadcrumbMapping from './breadcrumb-mapping';


export default combineReducers({
  breadcrumb,
  breadcrumbMapping,
  suggestionApp,
  officerPage,
  landingPage,
  complaintPage,
  trrPage
});
