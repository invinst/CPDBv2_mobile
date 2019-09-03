'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'beta', // feel free to remove the appEnv property here
  baseUrlV1: 'http://m.cpdb.co',
  baseUrlV2: 'https://betaapi.cpdp.co/api/v1',
  baseUrlV2V2: 'https://betaapi.cpdp.co/api/v2',
  gaTrackingId: 'UA-63671047-2',
  intercomAppId: 'p51vy1rb',
};

export default Object.freeze(Object.assign({}, baseConfig, config));
