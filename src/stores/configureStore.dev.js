import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';

import rootReducer from 'reducers/root-reducer';

import createLogger from 'redux-logger';
// TODO: Remove this later
const logger = createLogger({
  diff: true,
  stateTransformer: (obj) => (JSON.stringify(obj))
});

export default function configureStore(initialState) {
  /* istanbul ignore next */
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, configuredAxiosMiddleware, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
