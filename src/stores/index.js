import config from 'config';
import configureDev from './configure-store.dev';
import configureProd from './configure-store.prod';

let configureStore;

/* istanbul ignore next */
if (config.appEnv === 'prod') {
  configureStore = configureProd;
} else {
  configureStore = configureDev;
}

export default configureStore;
