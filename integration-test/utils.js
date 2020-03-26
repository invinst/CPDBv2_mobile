module.exports = {
  dismissPinButtonIntroduction: function (client) {
    client.execute('localStorage.setItem(\'PIN_BUTTON_INTRODUCTION\', \'1\')');
    client.refresh();
  },
  enablePinButtonIntroduction: function (client) {
    client.execute('localStorage.removeItem(\'PIN_BUTTON_INTRODUCTION\')');
    client.refresh();
  },
  enablePinboardButtonIntroduction: function (client) {
    client.execute('localStorage.removeItem(\'PINBOARD_BUTTON_INTRODUCTION\')');
    client.refresh();
  },
  enablePinboardIntroduction: function (client) {
    client.execute('localStorage.removeItem(\'PINBOARD_INTRODUCTION\')');
    client.refresh();
  },
};
