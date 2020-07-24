'use strict';

import Page from './page';


class LandingPage extends Page {
  constructor() {
    super();
    this.prepareElementGetters({
      title: '//div[@class="site-title"]',
      description: '//div[@class="site-desc"]',
    });
  }

  open() {
    super.open('/');
  }
}

module.exports = new LandingPage();
