'use strict';

import Page from './page';
import Section from './sections/section';


class NthRow extends Section {
  constructor(name, index) {
    super('', `//div[@class="results ${name}"]//a[contains(@class, "search-item")][${index}]`);

    this.prepareElementGetters({
      itemTitle: '//div[@class="item-title"]',
      itemSubtitle: '//div[@class="item-subtitle"]',
      pinButton: '//div[contains(@class, "item-pin-button__item-pin-button")]',
      itemIndicator: '//span[@class="item-indicator"]',
      pinButtonIntroduction: '//div[@class="pin-button-introduction"]',
    });
  }
}

class ResultsSection extends Section {
  constructor(name) {
    super('', `//div[@class="results ${name}"]`);

    this.firstRow = new NthRow(name, 1);
    this.secondRow = new NthRow(name, 2);
    this.thirdRow = new NthRow(name, 3);

    this.prepareElementGetters({
      allLink: '//div[@class="all"]',
      rows: '//a[contains(@class, "search-item")]',
    });
  }
}

class NthRecentItem extends Section {
  constructor(index) {
    super('', `//div[@class="results recent"]//a[contains(@class, "search-item")][${index}]`);

    this.prepareElementGetters({
      itemTitle: '//div[@class="item-title"]',
      itemSubtitle: '//div[@class="item-subtitle"]',
      pinButton: '//div[contains(@class, "item-pin-button__item-pin-button")]',
      pinButtonIntroduction: '//div[@class="pin-button-introduction"]',
    });
  }
}

class RecentSection extends Section {
  firstRecentItem = new NthRecentItem(1);
  secondRecentItem = new NthRecentItem(2);
  thirdRecentItem = new NthRecentItem(3);
}

class PinboardIntroductionSection extends Section {
  constructor() {
    super('', '//div[contains(@class, "pinboard-introduction")]');

    this.prepareElementGetters({
      content: '//div[@class="introduction-content"]',
      closeButton: '//div[@class="introduction-close-btn"]',
      getStartedButton: '//a[@class="get-started-btn"]',
    });
  }
}

class SearchPage extends Page {
  recent = new RecentSection();
  dateCRs = new ResultsSection('dateCRs');
  dateTRRs = new ResultsSection('dateTRRs');
  dateOfficers = new ResultsSection('dateOfficers');
  officers = new ResultsSection('officers');
  crs = new ResultsSection('crs');
  investigatorCRs = new ResultsSection('investigatorCRs');
  trrs = new ResultsSection('trrs');
  pinboardIntroduction = new PinboardIntroductionSection();

  constructor() {
    super();
    this.prepareElementGetters({
      body: 'body',
      closeButton: 'button.bt-close',
      queryInput: '.query-input',
      backToFullSearchLink: '.back-to-full-search-link',
      recentHeader: '#search-category-recent',
      dateCRsHeader: '#search-category-dateCRs',
      dateTRRsHeader: '#search-category-dateTRRs',
      dateOfficersHeader: '#search-category-dateOfficers',
      crsHeader: '#search-category-crs',
      investigatorCRsHeader: '#search-category-investigatorCRs',
      trrsHeader: '#search-category-trrs',
      officersHeader: '#search-category-officers',
      pinboardBar: '.test--pinboard-bar',
      toast: '.Toastify__toast-body',
      searchBreadcrumb: '.breadcrumb-item:nth-child(3)',
      pinButtonIntroduction: '//div[@class="pin-button-introduction"]',
    });
  }

  open(query = '') {
    let result = '/search/';
    if (query) {
      result = `${result}?q=${query}`;
    }
    super.open(result);
  }

  openWithTerms(term) {
    super.open(`/search/?terms=${term}`);
  }
}

module.exports = new SearchPage();
