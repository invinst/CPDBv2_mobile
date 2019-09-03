import { combineReducers } from 'redux';

import message from './message';
import subscribedCRIds from './subscribed-crids';

export default combineReducers({
  message,
  subscribedCRIds,
});
