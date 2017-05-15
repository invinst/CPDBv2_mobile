'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'test',  // don't remove the appEnv property here
  baseUrlV1: 'http://localhost:9002',
  baseUrlV2: 'http://localhost:9002',
  baseUrlV2V2: 'http://localhost:9002',

  bottomSheet: {
    transitionDuration: 1
    // because setting it to 0 will result in bottom sheet not disappearing when transitioning back to root
  }
};

export default Object.freeze(Object.assign(baseConfig, config));
