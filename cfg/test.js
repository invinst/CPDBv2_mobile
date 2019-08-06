'use strict';

let path = require('path');
let srcPath = path.join(__dirname, '/../src/');

let baseConfig = require('./base');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: ['isparta-instrumenter-loader'],
        include: [
          path.join(__dirname, '/../src')
        ]
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: srcPath,
        use: ['eslint-loader']
      },
      {
        test: /\.(svg|png|jpg|gif|woff|woff2|css|sass|scss|less|styl|json)$/,
        use: ['null-loader']
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test')
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
  plugins: [],
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
