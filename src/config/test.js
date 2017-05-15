'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'test',  // don't remove the appEnv property here
  baseUrlV1: 'http://m.lvh.me:8000',
  baseUrlV2: 'http://beta.cpdp.co', // just placeholder, in test env, all of them should be mocked

  bottomSheet: {
    transitionDuration: 1
    // because setting it to 0 will result in bottom sheet not disappearing when transitioning back to root
  }
};

export default Object.freeze(Object.assign(baseConfig, config));
