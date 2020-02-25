import { handleActions } from 'redux-actions';

import { TOAST_REQUEST_SUCCESS } from 'actions/toast';


export default handleActions({
  [TOAST_REQUEST_SUCCESS]: (state, action) => {
    return action.payload;
  },
}, []);
