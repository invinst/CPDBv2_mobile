import { handleActions } from 'redux-actions';

import { SHOW_TOAST } from 'actions/toast';


export default handleActions({
  [SHOW_TOAST]: (state, action) => action.payload
}, {});
