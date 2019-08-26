import { combineReducers } from 'redux';

import message from './message';
import subscribedTRRIds from './subscribed-trr-ids';

export default combineReducers({
  message,
  subscribedTRRIds,
});
