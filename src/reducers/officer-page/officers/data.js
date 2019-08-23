import { handleActions } from 'redux-actions';

import { OFFICER_REQUEST_SUCCESS, OFFICER_REQUEST_FAILURE } from 'actions/officer-page';


const officers = handleActions({
  [OFFICER_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload['officer_id']]: action.payload,
    [action.meta.id]: action.payload,
  }),
  [OFFICER_REQUEST_FAILURE]: (state, action) => state,
}, {});

export default officers;
