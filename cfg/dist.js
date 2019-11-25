'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./base');
const defaultSettings = require('./defaults');

const parametersMapping = {
  'production': {
    'DISABLE_SEARCH_INDEX': false,
    'CLICKY_ID': '101220048',
  },
  'beta': {
    'DISABLE_SEARCH_INDEX': false,
    'CLICKY_ID': '101220050',
  },
  'staging': {
    'DISABLE_SEARCH_INDEX': true,
    'CLICKY_ID': '101227137',
  },
  'live-test': {
    'DISABLE_SEARCH_INDEX': true,
    'CLICKY_ID': '000000000',
  },
};
// Add needed plugins here

let config = Object.assign({}, baseConfig, {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'app.[hash].js',
    publicPath: defaultSettings.publicPath
  },
  cache: false,
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '../') }),
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img' },
      { from: 'src/fonts', to: 'fonts' },
      { from: 'src/static', to: 'static' }
    ]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: path.join(__dirname, '/../')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html.template',
      filename: 'index.html',
      templateParameters: parametersMapping[process.env.WEBPACK_ENV],
    }),
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
