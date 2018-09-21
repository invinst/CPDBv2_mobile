'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'test',  // don't remove the appEnv property here
  baseUrlV1: 'http://m.lvh.me:8000',
  baseUrlV2: 'https://cpdp.co', // just placeholder, in test env, all of them should be mocked
};

export default Object.freeze(Object.assign(baseConfig, config));
