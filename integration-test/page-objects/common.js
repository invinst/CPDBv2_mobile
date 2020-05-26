module.exports = {
  elements: {
    body: 'body',
    clickyScript: {
      selector: '//script[@src="//static.getclicky.com/js"]',
      locateStrategy: 'xpath',
    },
    clickySiteIdsScript: {
      selector: '//script[contains(text(), "var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(")]',
      locateStrategy: 'xpath',
    },
    clickyNoJavascriptGIF: {
      selector: '//noscript[contains(text(), \'<img alt="Clicky" width="1" height="1" src="//in.getclicky.com/\')]',
      locateStrategy: 'xpath',
    },
  },
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
