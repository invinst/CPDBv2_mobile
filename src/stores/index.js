import configureDev from './configureStore.dev';

let configureStore = configureDev;

if (global.DEVELOPMENT) {
  /* istanbul ignore next */
  configureStore = configureDev;
}

export default configureStore;
