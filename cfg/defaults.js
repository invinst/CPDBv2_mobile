'use strict';
const path = require('path');

const srcPath = path.join(__dirname, '/../src');
const defaultPort = 9967;

function getDefaultModules() {
  return {
    noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl.js/,
    loaders: [
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
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: 'url-loader?limit=8192',
        options: {
          fallback: 'file-loader',
        }
      },
      {
        test: /\.(json)$/,
        loader: 'json-loader'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader',
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/',
  port: defaultPort,
  getDefaultModules: getDefaultModules,
  postcss: function () {
    return [];
  }
};
