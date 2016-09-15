'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

const port = 9001;

let config = Object.assign({}, baseConfig, {
  port: port,
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://127.0.0.1:' + port,
    'webpack/hot/only-dev-server',
    './src_redux/index'
  ],
  devServer: {
    contentBase: './src_redux/',
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: defaultSettings.publicPath,
    noInfo: true
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [path.join(__dirname, '/../src_redux')]
  )
});

module.exports = config;
