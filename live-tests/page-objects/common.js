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
};
