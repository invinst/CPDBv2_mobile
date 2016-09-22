'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  baseUrlV1: 'http://m.lvh.me:8000',
  baseUrlV2: 'http://localhost:8000/api/v1'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
