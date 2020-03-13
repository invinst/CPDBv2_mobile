'use strict';

let path = require('path');
const webpack = require('webpack');
let srcPath = path.join(__dirname, '/../src/');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(__dirname, '/../src')
        ],
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        },
        enforce: 'post',
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: srcPath,
        use: ['eslint-loader']
      },
      {
        test: /\.(svg|png|jpg|gif|woff|woff2|less|styl)$/,
        use: ['null-loader']
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test')
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.sass/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              camelCase: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              indentedSyntax: true
            }
          },
        ]
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
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
