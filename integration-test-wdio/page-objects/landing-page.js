'use strict';

import Page from './page';


class LandingPage extends Page {
  constructor() {
    super();
    this.prepareElementGetters({
      title: '//div[@class="site-title"]',
      description: '//div[@class="site-desc"]',
      searchLink: 'a[href="/search/"]',
    });
  }

  open() {
    super.open('/');
  }
}

module.exports = new LandingPage();
