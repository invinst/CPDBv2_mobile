import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { routerMiddleware } from 'connected-react-router';

import config from 'config';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import localStorageConfig from './local-storage-config';
import scrollPositionMiddleware from 'middleware/scroll-position-middleware';
import trackingMiddleware from 'middleware/tracking-middleware';
import restoreCreateOrUpdatePinboardMiddleware from 'middleware/restore-create-or-update-pinboard-middleware';
import fetchAndRedirectPinboardMiddleware from 'middleware/fetch-and-redirect-pinboard-middleware';
import history from 'utils/history';


const { pinboard: enablePinboardFeature } = config.enableFeatures;
export default function configureStore(initialState) {
  /* istanbul ignore next */
  let middleware = [
    routerMiddleware(history),
    thunk,
    configuredAxiosMiddleware,
    scrollPositionMiddleware,
    trackingMiddleware,
    fetchAndRedirectPinboardMiddleware,
  ];
  if (enablePinboardFeature) {
    middleware = [...middleware, restoreCreateOrUpdatePinboardMiddleware];
  }

  return createStore(
    rootReducer(history),
    initialState,
    compose(
      applyMiddleware(...middleware),
      persistState(()=>{}, localStorageConfig)
    )
  );
}
