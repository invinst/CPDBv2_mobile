module.exports = {
  pinboardsMenu: {
    nthMenuItemTitle: function (index) {
      return {
        selector: `(//div[@class="pinboard-title"])[${index}]`,
        locateStrategy: 'xpath',
      };
    },
    nthMenuItemCreatedAt: function (index) {
      return {
        selector: `(//div[@class="pinboard-created-at"])[${index}]`,
        locateStrategy: 'xpath',
      };
    },
    nthPinButton: function (index) {
      return {
        selector: `(//div[@class="pin-button"])[${index}]`,
        locateStrategy: 'xpath',
      };
    },
  },
};
