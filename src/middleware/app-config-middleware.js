import { LOCATION_CHANGE } from 'connected-react-router';

import { APP_CONFIG_FETCH_SUCCESS, fetchAppConfig } from 'actions/common/app-config';
import appConfig from 'utils/app-config';
import { APP_CONFIG_KEYS } from 'constants';


const appConfigTransform = config => ({
  ...config,
  [APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]: parseInt(config[APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]),
  [APP_CONFIG_KEYS.VISUAL_TOKEN_COLORS]: (config[APP_CONFIG_KEYS.VISUAL_TOKEN_COLORS] || []).map(visualTokenColor => ({
    upper: visualTokenColor['upper_range'],
    lower: visualTokenColor['lower_range'],
    backgroundColor: visualTokenColor['color'],
    textColor: visualTokenColor['text_color'],
  })),
});

const appConfigMiddleware = store => next => action => {
  const result = next(action);
  if (action.type === LOCATION_CHANGE) {
    if (appConfig.isEmpty()) {
      store.dispatch(fetchAppConfig());
    }
  }
  if (action.type === APP_CONFIG_FETCH_SUCCESS) {
    appConfig.set(appConfigTransform(action.payload));
  }

  return result;
};

export default appConfigMiddleware;
