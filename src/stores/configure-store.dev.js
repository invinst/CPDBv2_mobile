import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import config from 'config';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import localStorageConfig from './local-storage-config';
import scrollPositionMiddleware from 'middleware/scroll-position-middleware';
import trackingMiddleware from 'middleware/tracking-middleware';
import restoreCreateOrUpdatePinboardMiddleware from 'middleware/restore-create-or-update-pinboard-middleware';
import fetchAndRedirectPinboardMiddleware from 'middleware/fetch-and-redirect-pinboard-middleware';


const { pinboard: enablePinboardFeature } = config.enableFeatures;
const logger = createLogger({
  diff: true,
});

export default function configureStore(initialState) {
  /* istanbul ignore next */
  let middleware = [
    thunk,
    configuredAxiosMiddleware,
    logger,
    scrollPositionMiddleware,
    trackingMiddleware,
    fetchAndRedirectPinboardMiddleware,
  ];
  if (enablePinboardFeature) {
    middleware = [...middleware, restoreCreateOrUpdatePinboardMiddleware];
  }

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      persistState(()=>{}, localStorageConfig),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );
}
