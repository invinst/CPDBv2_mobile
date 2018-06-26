import { combineReducers } from 'redux';

import suggestionApp from './suggestion-app';
import officerPage from './officer-page';
import landingPage from './landing-page';
import complaintPage from './complaint-page';
import navbar from './navbar';
import trrPage from './trr-page';


export default combineReducers({
  suggestionApp,
  officerPage,
  landingPage,
  complaintPage,
  trrPage,
  navbar
});
