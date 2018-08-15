const switchToRecentTab = function (browser) {
  browser.windowHandles(function (result) {
    const tabs = result.value;
    const handle = result.value[tabs.length - 1];
    browser.switchWindow(handle);
  });
};

var utils = {
  switchToRecentTab: switchToRecentTab
};

module.exports = utils;
