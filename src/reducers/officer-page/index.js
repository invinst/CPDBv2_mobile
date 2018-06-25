import { combineReducers } from 'redux';

import timelines from './timelines';
import officers from './officers';


export default combineReducers({
  timelines,
  officers
});
