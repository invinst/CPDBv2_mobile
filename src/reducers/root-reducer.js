import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import suggestionApp from './suggestion-app';
import officerPage from './officer-page';
import landingPage from './landing-page';
import complaintPage from './complaint-page';
import trrPage from './trr-page';
import breadcrumb from './breadcrumb';
import embed from './embed';
import pinboardPage from './pinboard-page';
import toasts from './toasts';


export default (history) => combineReducers({
  breadcrumb,
  suggestionApp,
  router: connectRouter(history),
  officerPage,
  landingPage,
  complaintPage,
  trrPage,
  embed,
  pinboardPage,
  toasts,
});
