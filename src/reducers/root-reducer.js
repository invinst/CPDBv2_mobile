import { combineReducers } from 'redux';

import suggestionApp from './suggestionApp';
import officerPage from './officerPage';
import complaintPage from './complaintPage';
import landingPage from './landingPage';
import reportingPage from './reportingPage';


export default combineReducers({
  suggestionApp,
  officerPage,
  complaintPage,
  landingPage,
  reportingPage
});
