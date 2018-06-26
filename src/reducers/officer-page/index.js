import { combineReducers } from 'redux';

import summaries from './summaries';
import timeline from './timeline';


export default combineReducers({
  summaries,
  timeline,
});
