'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./base');
const defaultSettings = require('./defaults');

// Add needed plugins here

let config = Object.assign({}, baseConfig, {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.[hash].js',
    publicPath: defaultSettings.staticFileBase
  },
  cache: false,
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '../') }),
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img' },
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
      filename: '../index.html',
      templateParameters: {
        'DISABLE_SEARCH_INDEX': process.env.WEBPACK_ENV === 'staging',
      },
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
