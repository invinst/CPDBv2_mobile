'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  baseUrlV1: 'http://m.cpdb.co',
  baseUrlV2: 'https://beta.cpdp.co/v1/api'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
