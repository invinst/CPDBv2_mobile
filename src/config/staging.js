'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'staging', // feel free to remove the appEnv property here
  baseUrlV1: 'http://m.cpdb.co',
  baseUrlV2: 'https://stagingapi.cpdp.co/api/v1',
  baseUrlV2V2: 'https://stagingapi.cpdp.co/api/v2',
  gaTrackingId: 'UA-63671047-3',
  intercomAppId: 'gbsby1ik'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
