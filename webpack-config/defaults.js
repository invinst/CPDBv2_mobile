'use strict';
const path = require('path');

const srcPath = path.join(__dirname, '/../src');
const defaultPort = 9967;

function getDefaultModules() {
  return {
    noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl.js/,
    rules: [
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
              indentedSyntax: true,
              includePaths: ['src/styles'],
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
              includePaths: ['src/styles'],
            }
          }
        ]
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'file-loader',
          }
        ],
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        use: ['file-loader']
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
