'use strict';

import baseConfig from './base';


let config = {
  appEnv: 'integration-test', // don't remove the appEnv property here
  baseUrlV1: 'http://localhost:9002',
  baseUrlV2: 'http://localhost:9002/api/v1',
  baseUrlV2V2: 'http://localhost:9002/api/v2',
  enableFeatures: { pinboard: localStorage.getItem('PINBOARD_ENABLED') !== 'false' },
  requestRetryDelay: 10,
};

export default Object.freeze(Object.assign(baseConfig, config));
