var recursiveReadSync = require('recursive-readdir-sync');
var path = require('path');
var startMockServer = require(__dirname + '/mock-server');
var api = require(__dirname + '/mock-api');
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
  console.info('>> importing test:', name);
  describe(name, function () {
    require(path);
  });
}

const server = startMockServer();

describe('CPDBv2_mobile', function () {
  beforeEach(function (client, done) {
    api.clean();
    done();
  });

  after(function (client, done) {
    client.end(function () {
      server.close(function () {
        done();
      });
    });
  });

  afterEach(function (client, done) {
    client.execute('localStorage.clear()');
    done();
  });

  files.forEach(function (file) {
    importTest(file, path.resolve(file));
  });
});
