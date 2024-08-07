import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import suggestionApp from './suggestion-app';
import officerPage from './officer-page';
import landingPage from './landing-page';
import complaintPage from './complaint-page';
import lawsuitPage from 'reducers/lawsuit-page';
import trrPage from './trr-page';
import breadcrumb from './breadcrumb';
import embed from './embed';
import pinboardPage from './pinboard-page';
import toasts from './toasts';
import pinboardIntroduction from './pinboard-introduction';
import appConfigRequesting from './app-config-requesting';


export default (history) => combineReducers({
  breadcrumb,
  suggestionApp,
  router: connectRouter(history),
  officerPage,
  landingPage,
  complaintPage,
  lawsuitPage,
  trrPage,
  embed,
  pinboardPage,
  toasts,
  pinboardIntroduction,
  appConfigRequesting,
});
