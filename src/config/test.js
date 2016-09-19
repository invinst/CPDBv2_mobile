'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'test',  // don't remove the appEnv property here
  baseUrl: 'http://m.lvh.me:8000'
};

export default Object.freeze(Object.assign(baseConfig, config));
