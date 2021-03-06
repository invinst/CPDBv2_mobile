'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here

const port = 9001;

let config = Object.assign({}, baseConfig, {
  mode: 'development',
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    'webpack-dev-server/client?http://127.0.0.1:' + port,
    './src/index'
  ],
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: false,
    port: port,
    publicPath: defaultSettings.publicPath,
    noInfo: true
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed rules to the defaults here
config.module.rules.push({
  test: /\.(js|jsx)$/,
  use: ['babel-loader'],
  include: [path.join(__dirname, '/../src')]
});

module.exports = config;
