import { handleActions } from 'redux-actions';

import { UPDATE_ACTIVE_CATEGORY } from 'actions/suggestion';


export default handleActions({
  [UPDATE_ACTIVE_CATEGORY]: (state, action) => action.payload,
}, '');
