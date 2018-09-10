import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import localStorageConfig from './local-storage-config';
import scrollPositionMiddleware from 'middleware/scroll-position-middleware';
import trackingMiddleware from 'middleware/tracking-middleware';


export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, configuredAxiosMiddleware, scrollPositionMiddleware, trackingMiddleware),
      persistState(()=>{}, localStorageConfig)
    )
  );
}
