var recursiveReadSync = require('recursive-readdir-sync'),
  files = recursiveReadSync('./live-tests/test');

var path = require('path');
var server = require(__dirname + '/mock-server');

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
