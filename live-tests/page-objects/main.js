module.exports = {
  url: function () {
    return this.api.globals.clientUrl;
  },
  elements: {
    title: '.site-title',
    searchLink: 'a[href="/search/"]',
  },

  sections: {
    footer: {
      selector: '//div[contains(@class, "footer__footer")]',
      locateStrategy: 'xpath',
      elements: {
        legal: '.item:nth-child(1)',
        github: '.item:nth-child(2)',
        logo: '.invist-logo-link'
      }
    },
    legalModal: {
      selector: '//div[contains(@class, "legal-modal")]',
      locateStrategy: 'xpath',
      elements: {
        content: '.legal-content',
        closeButton: '.close-button-wrapper',
        understandButton: '.confirm-button'
      }
    }
  }
};
