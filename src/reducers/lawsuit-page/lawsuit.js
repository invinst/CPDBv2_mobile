import { handleActions } from 'redux-actions';

import { LAWSUIT_FETCH_SUCCESS } from 'actions/lawsuit-page';


export default handleActions({
  [LAWSUIT_FETCH_SUCCESS]: (state, action) => (action.payload),
}, {});
