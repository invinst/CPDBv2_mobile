'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  baseUrlV1: 'http://m.cpdb.co',
  baseUrlV2: 'http://beta.cpdp.co'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
