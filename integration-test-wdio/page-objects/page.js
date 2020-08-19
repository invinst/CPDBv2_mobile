'use strict';

import Section from './sections/section';


export default class Page extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      clickyScript: '//*[name()="script" and @src="//static.getclicky.com/js"]',
      clickySiteIdsScript: '//*[text()="var clicky_site_ids = clicky_site_ids ' +
        '|| []; clicky_site_ids.push(123456789);" ' +
        'and name()="script"]',
      clickyNoJavascriptGIF:
        '//*[name()="noscript"' +
        ' and contains(text(), \'<img alt="Clicky" width="1" height="1" src="//in.getclicky.com/\')]',

      lastToast: '(//div[contains(@class, "Toastify__toast-body")])[last()]',
    });
  }

  open(path) {
    browser.deleteCookies();
    browser.url(path);
    $('body').waitForDisplayed();
  }
}
