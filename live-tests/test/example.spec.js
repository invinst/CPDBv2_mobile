describe('MainPageTest', function () {
  it('should return suggestions for officer name', function (client) {
    client.maximizeWindow();

    client
      .url('http://localhost:9001')
      .waitForElementVisible('body', 10000)
      .waitForElementVisible('.cpdb-logo', 10000)
      .assert.visible('.cpdb-logo')
      .assert.containsText('.cpdb-logo', 'CPDP');
  });
});
