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
import browserHistory from 'utils/history';


const { pinboard: enablePinboardFeature } = config.enableFeatures;

function configureStore(initialState) {
  /* istanbul ignore next */
  let middleware = [
    routerMiddleware(browserHistory),
    thunk,
    configuredAxiosMiddleware,
    scrollPositionMiddleware,
    trackingMiddleware,
    fetchAndRedirectPinboardMiddleware,
  ];
  if (enablePinboardFeature) {
    middleware = [...middleware, restoreCreateOrUpdatePinboardMiddleware];
  }

  const composeArgs = [
    applyMiddleware(...middleware),
    persistState(()=>{}, localStorageConfig),
  ];

  /* istanbul ignore next */
  if (config.appEnv === 'dev') {
    composeArgs.push(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);
  }

  return createStore(
    rootReducer(browserHistory),
    initialState,
    compose(...composeArgs)
  );
}

let store;

export default (...args) => {
  store = store || configureStore(...args);
  return store;
};
