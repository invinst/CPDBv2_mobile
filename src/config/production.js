'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'production',
  baseUrlV1: 'http://m.cpdb.co',
  baseUrlV2: 'https://api.cpdp.co/api/v1',
  baseUrlV2V2: 'https://api.cpdp.co/api/v2',
  gaTrackingId: 'UA-63671047-2',
  intercomAppId: 'p51vy1rb',
  enableFeatures: { pinboard: false },
};

export default Object.freeze(Object.assign({}, baseConfig, config));
