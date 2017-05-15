'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  baseUrlV1: 'http://m.cpdb.co',
  baseUrlV2: 'http://staging.cpdp.co/api/v1',
  baseUrlV2V2: 'http://staging.cpdp.co/api/v2'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
