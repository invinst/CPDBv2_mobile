import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


export default handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    faqs: action.payload['faqs'] || ''
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => ({})
}, {});
