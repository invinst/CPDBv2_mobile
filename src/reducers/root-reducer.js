import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as breadcrumb } from 'redux-breadcrumb-trail';

import suggestionApp from './suggestion-app';
import officerPage from './officer-page';
import landingPage from './landing-page';
import complaintPage from './complaint-page';
import trrPage from './trr-page';
import breadcrumbMapping from './breadcrumb-mapping';
import embed from './embed';
import pinboardPage from './pinboard-page';


export default (history) => combineReducers({
  breadcrumb,
  breadcrumbMapping,
  suggestionApp,
  router: connectRouter(history),
  officerPage,
  landingPage,
  complaintPage,
  trrPage,
  embed,
  pinboardPage,
});
