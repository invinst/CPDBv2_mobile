'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here

let envarPlugin = new webpack.DefinePlugin({
  'ENV_VARS': {
    CPDB_API_HOST: JSON.stringify(process.env.CPDB_API_HOST)
  }
});

let config = Object.assign({}, baseConfig, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    envarPlugin
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed rules to the defaults here
config.module.rules.push({
  test: /\.(js|jsx)$/,
  use: ['react-hot-loader', 'babel-loader'],
  include: [path.join(__dirname, '/../src')]
});

module.exports = config;
