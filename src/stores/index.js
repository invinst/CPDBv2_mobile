// const redux = require('redux');
// const reducers = require('../reducers');

// module.exports = function (initialState) {
//   const store = redux.createStore(reducers, initialState);
//
//   if (module.hot) {
//     module.hot.accept('../reducers', () => {
//       const nextReducer = require('../reducers');
//       store.replaceReducer(nextReducer);
//     });
//   }
//
//   return store;
// };



import configureDev from './configureStore.dev';

let configureStore = configureDev;

if (global.DEVELOPMENT) {
  /* istanbul ignore next */
  configureStore = configureDev;
}

export default configureStore;
