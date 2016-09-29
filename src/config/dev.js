'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  baseUrlV1: 'http://m.lvh.me:9002',
  baseUrlV2: 'http://localhost:9002/api/v1'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
