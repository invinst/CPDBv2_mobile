import { combineReducers } from 'redux';

import timeline from './timeline';
import officers from './officers';
import cms from './cms';


export default combineReducers({
  timeline,
  officers,
  cms,
});
