import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as breadcrumb } from 'redux-breadcrumb-trail';

import suggestionApp from './suggestion-app';
import officerPage from './officer-page';
import landingPage from './landing-page';
import complaintPage from './complaint-page';
import trrPage from './trr-page';
import breadcrumbMapping from './breadcrumb-mapping';
import embed from './embed';
import pinboardPage from './pinboard-page';


export default combineReducers({
  breadcrumb,
  breadcrumbMapping,
  suggestionApp,
  routing: routerReducer,
  officerPage,
  landingPage,
  complaintPage,
  trrPage,
  embed,
  pinboardPage,
});
