import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import config from 'config';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import localStorageConfig from './local-storage-config';
import scrollPositionMiddleware from 'middleware/scroll-position-middleware';
import trackingMiddleware from 'middleware/tracking-middleware';
import restoreCreateOrUpdatePinboardMiddleware from 'middleware/restore-create-or-update-pinboard-middleware';


const { pinboard: enablePinboardFeature } = config.enableFeatures;
export default function configureStore(initialState) {
  /* istanbul ignore next */
  let middleware = [
    thunk,
    configuredAxiosMiddleware,
    scrollPositionMiddleware,
    trackingMiddleware,
  ];
  if (enablePinboardFeature) {
    middleware = [...middleware, restoreCreateOrUpdatePinboardMiddleware];
  }

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      persistState(()=>{}, localStorageConfig)
    )
  );
}
