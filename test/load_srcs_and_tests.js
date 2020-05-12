'use strict';

require('core-js/stable');
import 'regenerator-runtime/runtime';
require('./setup');

// Add support for all files in the test directory
const testsContext = require.context('.', true, /(spec\.js$)|(Test\.js$)|(Helper\.js$)/);
testsContext.keys().forEach(testsContext);


// Load all files in src directory
const srcsContext = require.context('../src', true, /^\.\/(?!(config)).*\/.*\.js$/);
srcsContext.keys().forEach(srcsContext);
