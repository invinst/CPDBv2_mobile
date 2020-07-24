'use strict';

import baseConfig from './base';

const baseUrl = `http://localhost:${localStorage.getItem('API_DOMAIN_PORT') || 9002}`;

let config = {
  appEnv: 'integration-test', // don't remove the appEnv property here
  baseUrlV1: baseUrl,
  baseUrlV2: `${baseUrl}/api/v1`,
  baseUrlV2V2: `${baseUrl}/api/v2`,
  enableFeatures: { pinboard: localStorage.getItem('PINBOARD_ENABLED') !== 'false' },
  requestRetryDelay: 10,
};

export default Object.freeze(Object.assign(baseConfig, config));
