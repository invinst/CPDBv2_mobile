/* globals ENV_VARS */
'use strict';

import baseConfig from './base';

const apiHost = ENV_VARS.CPDB_API_HOST || 'localhost:8000';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  baseUrlV1: 'https://m.cpdb.co',
  baseUrlV2: `https://${apiHost}/api/v1`,
  baseUrlV2V2: `https://${apiHost}/api/v2`
};

export default Object.freeze(Object.assign({}, baseConfig, config));
