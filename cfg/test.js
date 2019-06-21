'use strict';

let path = require('path');
const webpack = require('webpack');
let srcPath = path.join(__dirname, '/../src/');

let baseConfig = require('./base');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
  devtool: 'eval',
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'isparta-instrumenter-loader',
        include: [
          path.join(__dirname, '/../src')
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(svg|png|jpg|gif|woff|woff2|less|styl|json)$/,
        loader: 'null-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [].concat(
          baseConfig.additionalPaths,
          [
            path.join(__dirname, '/../src'),
            path.join(__dirname, '/../test')
          ]
        )
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader?camelCase&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' +
        '!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: srcPath + 'actions/',
      helpers: path.join(__dirname, '/../test/helpers'),
      examples: path.join(__dirname, '/../test/examples'),
      factories: path.join(__dirname, '/../test/factories'),
      components: srcPath + 'components/',
      reducers: srcPath + 'reducers/',
      middleware: srcPath + 'middleware/',
      containers: srcPath + 'containers/',
      selectors: srcPath + 'selectors/',
      stores: srcPath + 'stores/',
      utils: srcPath + 'utils/',
      constants: srcPath + 'constants/',
      styles: srcPath + 'styles/',
      img: srcPath + 'img/',
      config: srcPath + `config/${process.env.WEBPACK_ENV}`
    }
  },
  plugins: [
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"test"'
    }),
  ],
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
