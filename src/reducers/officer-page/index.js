import { combineReducers } from 'redux';

import summaries from './summaries/index';
import timelines from './timelines/index';


export default combineReducers({
  summaries,
  timelines
});
