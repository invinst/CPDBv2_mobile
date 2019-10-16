import { handleActions } from 'redux-actions';

import { TRR_PAGE_CMS_REQUEST_SUCCESS } from 'actions/trr-page';


export default handleActions({
  [TRR_PAGE_CMS_REQUEST_SUCCESS]: () => true,
}, false);
