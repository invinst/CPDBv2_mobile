import config from 'config';
import configureProd from './configure-store.prod';
import configureDev from './configure-store.dev';

let configureStore;

  /* istanbul ignore next */
if (['staging', 'beta', 'production'].includes(config.appEnv)) {
  configureStore = configureProd;
} else {
  configureStore = configureDev;
}

let store;

export default (...args) => {
  store = store || configureStore(...args);
  return store;
};
