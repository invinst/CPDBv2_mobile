import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import localStorageConfig from './local-storage-config';
import scrollPositionMiddleware from 'middleware/scroll-position-middleware';
import trackingMiddleware from 'middleware/tracking-middleware';


const logger = createLogger({
  diff: true,
});

export default function configureStore(initialState) {
  /* istanbul ignore next */
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, configuredAxiosMiddleware, logger, scrollPositionMiddleware, trackingMiddleware),
      persistState(()=>{}, localStorageConfig),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}