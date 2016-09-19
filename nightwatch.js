/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');

process.env.NODE_ENV = 'live-test';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');

const server = new WebpackDevServer(webpack(config), config.devServer);

server.listen(config.port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.port);
  console.log('Opening your system browser...');
});

var opts = process.argv.slice(2);

if (opts.indexOf('--config') === -1) {
  opts = opts.concat(['--config', 'nightwatch.conf.js']);
}

var spawn = require('cross-spawn');
var runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' });

runner.on('exit', function (code) {
  server.close();
  process.exit(code);
});

runner.on('error', function (err) {
  console.log(err);
  server.close();
  throw err
});
