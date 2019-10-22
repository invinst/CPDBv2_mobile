import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import localStorageConfig from './local-storage-config';
import scrollPositionMiddleware from 'middleware/scroll-position-middleware';
import trackingMiddleware from 'middleware/tracking-middleware';
import restoreCreateOrUpdatePinboardMiddleware from 'middleware/restore-create-or-update-pinboard-middleware';
import fetchAndRedirectPinboardMiddleware from 'middleware/fetch-and-redirect-pinboard-middleware';


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
        restoreCreateOrUpdatePinboardMiddleware,
        fetchAndRedirectPinboardMiddleware,
      ),
      persistState(()=>{}, localStorageConfig)
    )
  );
}
