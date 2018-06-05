import { combineReducers } from 'redux';

import suggestionApp from './suggestionApp';
import officerPage from './officerPage';
import landingPage from './landingPage';
import complaintPage from './complaintPage';
import navbar from './navbar';
import trrPage from './trrPage';


export default combineReducers({
  suggestionApp,
  officerPage,
  landingPage,
  complaintPage,
  trrPage,
  navbar
});
