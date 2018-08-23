'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'production',
  baseUrlV1: 'http://m.cpdb.co',
  baseUrlV2: 'https://beta.cpdp.co/api/v1',
  baseUrlV2V2: 'https://beta.cpdp.co/api/v2',
  gaTrackingId: 'UA-63671047-2'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
