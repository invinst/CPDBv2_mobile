const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);


describe('MainPageTest', function () {
  it('should return suggestions for officer name', function (client) {
    mock.onGet('http://m.lvh.me:8000/mobile/api/suggestion/?query=K').reply(200, [{
      "text": "Keith Herrera",
      "resource": "officer",
      "resource_key": "3160",
      "meta": {
        "id": 3160,
        "officer_first": "Keith",
        "officer_last": "Herrera",
        "allegations_count": 67,
        "race": "White/Hispanic",
        "gender": "M",
        "star": 17289.0
      }
    }]);

    client
      .url('http://localhost:9001')
      .waitForElementVisible('body', 1000)
      .assert.visible('.cpdb-logo')
      .assert.containsText('.cpdb-logo', 'CPDP')
      .setValue('.search-wrapper .input-text', 'K')
      .waitForElementVisible('.suggestion-list', 1000)
      .assert.visible('.suggestion-list')
      .assert.containsText('.suggestion-list', 'Kevin');

    mock.reset();
  });
});
