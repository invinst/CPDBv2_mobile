var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['ChromeHeadless'],
    files: [
      'test/load_srcs_and_tests.js'
    ],
    port: 8080,
    captureTimeout: 100000,
    frameworks: ['mocha', 'chai'],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: ['mocha', 'coverage'],
    preprocessors: {
      'test/load_srcs_and_tests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'text', subdir: 'report-text' },
      ]
    }
  });
};
