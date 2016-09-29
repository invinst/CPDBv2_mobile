'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'test',  // don't remove the appEnv property here
  baseUrlV1: 'http://localhost:9002',
  baseUrlV2: 'http://localhost:9002' // just placeholder, in test env, all of them should be mocked
};

export default Object.freeze(Object.assign(baseConfig, config));
