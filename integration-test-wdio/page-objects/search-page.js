'use strict';

import Page from './page';


class SearchPage extends Page {
  constructor() {
    super();
    this.prepareElementGetters({
      pinboardBar: '.test--pinboard-bar',
      queryInput: '.query-input',
    });
  }
}

module.exports = new SearchPage();
