import config from 'config';
import configureProd from './configureStore.prod';
import configureDev from './configureStore.dev';

let configureStore;

  /* istanbul ignore next */
if (['staging', 'production'].includes(config.appEnv)) {
  configureStore = configureProd;
} else {
  configureStore = configureDev;
}

export default configureStore;
