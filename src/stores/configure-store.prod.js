import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import localStorageConfig from './local-storage-config';
import scrollPositionMiddleware from 'middleware/scroll-position-middleware';
import trackingMiddleware from 'middleware/tracking-middleware';
import createOrUpdatePinboardMiddleware from 'middleware/create-or-update-pinboard-middleware';
import restorePinboardSession from 'middleware/restore-pinboard-session';


export default function configureStore(initialState) {
  /* istanbul ignore next */
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        configuredAxiosMiddleware,
        scrollPositionMiddleware,
        trackingMiddleware,
        createOrUpdatePinboardMiddleware,
        restorePinboardSession,
      ),
      persistState(()=>{}, localStorageConfig)
    )
  );
}
