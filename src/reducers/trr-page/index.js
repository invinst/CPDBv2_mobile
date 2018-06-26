import { combineReducers } from 'redux';

import trrs from './trrs';
import notFound from './not-found';


export default combineReducers({
  trrs,
  notFound
});
