module.exports = {
  url: function () {
    return this.api.globals.clientUrl;
  },

  elements: {
    category: '.category',
    subcategory: '.subcategory'
  },

  sections: {
    coaccusals: {
      selector: '//div[contains(@class, "accused-officers")]',
      locateStrategy: 'xpath',
      elements: {
        header: '.header',
        showAll: '.show-all',
        paddingBottom: '.padding-bottom'
      }
    },
    firstItem: {
      selector: '(//a[contains(@class, "coaccused-card")])[1]',
      locateStrategy: 'xpath',
      elements: {
        rank: '.officer-rank',
        name: '.officer-name',
        category: '.category',
        findingOutcome: '.finding-outcome'
      }
    }
  }
};
