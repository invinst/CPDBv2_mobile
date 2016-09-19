import { combineReducers } from 'redux';

import suggestionApp from './suggestionApp';
import officerPage from './officerPage';
import complaintPage from './complaintPage';


export default combineReducers({
  suggestionApp,
  officerPage,
  complaintPage
});
