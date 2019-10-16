import { handleActions } from 'redux-actions';

import { LANDING_PAGE_CMS_REQUEST_SUCCESS } from 'actions/landing-page';


export default handleActions({
  [LANDING_PAGE_CMS_REQUEST_SUCCESS]: () => true,
}, false);
