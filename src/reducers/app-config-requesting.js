import { handleActions } from 'redux-actions';

import { APP_CONFIG_FETCH_FAILURE, APP_CONFIG_LOADED } from 'actions/common/app-config';


export default handleActions({
  [APP_CONFIG_LOADED]: () => false,
  [APP_CONFIG_FETCH_FAILURE]: () => false,
}, true);
