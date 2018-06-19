import { combineReducers } from 'redux';

import summaries from './summaries';
import timelines from './timelines';
import officers from './officers';


export default combineReducers({
  summaries,
  timelines,
  officers
});
