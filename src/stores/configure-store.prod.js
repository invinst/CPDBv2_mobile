import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import rootReducer from 'reducers/root-reducer';
import localStorageConfig from './local-storage-config';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      persistState(()=>{}, localStorageConfig)
    )
  );
}
