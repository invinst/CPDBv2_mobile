var recursiveReadSync = require('recursive-readdir-sync');
var path = require('path');
var server = require(__dirname + '/mock-server');
var yargs = require('yargs-parser');
var _ = require('lodash');

var args = yargs(process.argv);
var files;
if (args.file) {
  if (_.startsWith(args.file, 'integration-test/test/')) {
    files = [args.file];
  } else {
    files = [`integration-test/test/${args.file}.spec.js`];
  }
} else {
  files = recursiveReadSync('./integration-test/test');
}

function importTest(name, path) {
  console.log('>> importing test:', name);
  describe(name, function () {
    require(path);
  });
}

describe('CPDBv2_mobile', function () {
  after(function (client, done) {
    client.end(function () {
      server.close(function () {
        done();
      });
    });
  });

  files.forEach(function (file) {
    importTest(file, path.resolve(file));
  });
});
