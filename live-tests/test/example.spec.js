describe('example test', function () {

  it('should visit google', function (client) {
    client
      .url('http://localhost:9001')
      .waitForElementVisible('body', 1000)
      .assert.visible('.cpdb-logo')
      .assert.containsText('.cpdb-logo', 'CPDP');

  });
});
