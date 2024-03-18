import { createAction } from 'redux-actions';

import { get } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import { APP_CONFIG_API_ENDPOINT } from 'constants';

export const APP_CONFIG_FETCH_START = 'APP_CONFIG_FETCH_START';
export const APP_CONFIG_FETCH_SUCCESS = 'APP_CONFIG_FETCH_SUCCESS';
export const APP_CONFIG_FETCH_FAILURE = 'APP_CONFIG_FETCH_FAILURE';
export const APP_CONFIG_LOADED = 'APP_CONFIG_LOADED';

export const fetchAppConfig = get(
  v2Url(APP_CONFIG_API_ENDPOINT),
  [
    APP_CONFIG_FETCH_START,
    APP_CONFIG_FETCH_SUCCESS,
    APP_CONFIG_FETCH_FAILURE,
  ]
);

export const appConfigLoaded = createAction(APP_CONFIG_LOADED);
