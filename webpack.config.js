'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test', 'integration-test'];

// Set the correct environment
let env = args.env || 'dev';

if (process.env.WEBPACK_ENV == 'integration-test') {
  env = 'integration-test';
}

if (!['production', 'beta', 'staging'].includes(process.env.WEBPACK_ENV)) {
  process.env.WEBPACK_ENV = env;
}

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';
  let config = require(path.join(__dirname, 'webpack-config/' + validEnv));
  return config;
}

module.exports = buildConfig(env);
