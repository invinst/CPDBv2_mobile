import config from 'config';
import configureProd from './configure-store.prod';
import configureDev from './configure-store.dev';
import configureTest from './configure-store.test';

let configureStore;

/* istanbul ignore next */
if (['staging', 'beta', 'production'].includes(config.appEnv)) {
  configureStore = configureProd;
} else if (config.appEnv === 'test') {
  configureStore = configureTest;
} else {
  configureStore = configureDev;
}

let store;

export default (...args) => {
  store = store || configureStore(...args);
  return store;
};
