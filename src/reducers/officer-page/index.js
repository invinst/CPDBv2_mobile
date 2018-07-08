import { combineReducers } from 'redux';

import timeline from './timeline';
import officers from './officers';


export default combineReducers({
  timeline,
  officers
});
