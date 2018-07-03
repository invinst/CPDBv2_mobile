module.exports = {
  url: function () {
    return this.api.globals.clientUrl;
  },
  elements: {
    cpdbLogo: '.title',
    searchLink: 'a[href="/search/"]'
  },

  sections: {
    footer: {
      selector: '//div[contains(@class, "footer__footer")]',
      locateStrategy: 'xpath',
      elements: {
        github: '.item:nth-child(2)',
        roadmap: '.item:nth-child(3)',
        logo: '.invist-logo-link'
      }
    }
  }
};
