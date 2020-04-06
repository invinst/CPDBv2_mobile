/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');

process.env.NODE_ENV = 'integration-test';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');
var spawn = require('cross-spawn');

const server = new WebpackDevServer(webpack(config), config.devServer);

server.listen(config.devServer.port, 'localhost', (err) => {
  if (err) {
    console.error(err);
  }
  console.info('Listening at localhost:' + config.devServer.port);
  console.info('Opening your system browser...');
});

var opts = process.argv.slice(2);

if (opts.indexOf('--config') === -1) {
  opts = opts.concat(['--config', 'nightwatch.json']);
}

var runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' });

runner.on('exit', function (code) {
  server.close();
  process.exit(code);
});

runner.on('error', function (err) {
  console.error(err);
  server.close();
  throw err
});
