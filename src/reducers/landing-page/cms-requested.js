import { handleActions } from 'redux-actions';

import { LANDING_PAGE_CMS_REQUEST_SUCCESS, LANDING_PAGE_CMS_REQUEST_FAILURE } from 'actions/landing-page';


export default handleActions({
  [LANDING_PAGE_CMS_REQUEST_SUCCESS]: () => true,
  [LANDING_PAGE_CMS_REQUEST_FAILURE]: state => state
}, false);
