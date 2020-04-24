/*eslint no-console:0 */
'use strict';
require('core-js/stable');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), config.devServer)
  .listen(config.devServer.port, '0.0.0.0', (err) => {
    if (err) {
      console.error(err);
    }
    console.info('Listening at localhost:' + config.devServer.port);
  });
