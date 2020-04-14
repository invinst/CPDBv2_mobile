const baseCarouselSection = (mainElementSelector, cardSelector, cardNameSelector) => ({
  locateStrategy: 'xpath',
  selector: mainElementSelector,
  sections: {
    cards: {
      locateStrategy: 'xpath',
      selector: `${mainElementSelector}${cardSelector}`,
      elements: {
        firstCard: {
          locateStrategy: 'xpath',
          selector: `${mainElementSelector}${cardSelector}`,
        },
        pinButton: {
          locateStrategy: 'xpath',
          selector: `${mainElementSelector}${ cardSelector }${ cardNameSelector }` +
            '//div[contains(@class, "item-pin-button__item-pin-button")]',
        },
      },
    },
  },
});

module.exports = {
  url: function () {
    return `${this.api.globals.clientUrl}/`;
  },
  elements: {
    body: 'body',
    title: '.site-title',
    searchLink: 'a[href="/search/"]',
    lastToast: {
      selector: '(//div[contains(@class, "Toastify__toast-body")])[last()]',
      locateStrategy: 'xpath',
    },
  },

  sections: {
    footer: {
      selector: '//div[contains(@class, "footer__footer")]',
      locateStrategy: 'xpath',
      elements: {
        legal: '.item:nth-child(1)',
        github: '.item:nth-child(2)',
        logo: '.invist-logo-link',
      },
    },
    legalModal: {
      selector: '//div[contains(@class, "legal-modal")]',
      locateStrategy: 'xpath',
      elements: {
        content: '.legal-content',
        closeButton: '.close-button-wrapper',
        understandButton: '.confirm-button',
      },
    },
    pinboardButtonIntroduction: {
      selector: '.pinboard-button-introduction',
      elements: {
        introductionContent: '.pinboard-button-introduction-content',
        dismissButton: '.dismiss-btn',
        tryItButton: '.try-it-btn',
        pinboardButton: {
          selector: '//div[contains(@class, "header-links")]//div[contains(@class, "pinboard-button")]',
          locateStrategy: 'xpath',
        },
      },
    },
    topOfficersByAllegation: baseCarouselSection(
      '//div[contains(@class, "carousel-wrapper__carousel-wrapper") ' +
        'and contains(.//a/@class, "base-officer-card__base-officer-card")][1]',
      '//a[contains(@class, "base-officer-card__base-officer-card")]',
      '[.//div[contains(@class, "officer-name") and text()="Broderick Jones"]]'
    ),
    recentActivities: baseCarouselSection(
      '//div[contains(@class, "carousel-wrapper__carousel-wrapper") ' +
        'and contains(.//a/@class, "base-officer-card__base-officer-card")][2]',
      '//a[contains(@class, "base-officer-card__base-officer-card")]',
      '[.//div[contains(@class, "officer-name") and text()="Broderick Jones"]]'
    ),
    newDocumentAllegations: baseCarouselSection(
      '//div[contains(@class, "carousel-wrapper__carousel-wrapper") ' +
        'and contains(.//a/@class, "complaint-document-card__complaint-document-card")]',
      '//a[contains(@class, "complaint-document-card__complaint-document-card")]',
      '[.//div[contains(@class, "complaint-info-category") and text()="Criminal Misconduct"]]'
    ),
    complaintSummaries: baseCarouselSection(
      '//div[contains(@class, "carousel-wrapper__carousel-wrapper") ' +
        'and contains(.//a/@class, "complaint-summary-card__complaint-summary-card")]',
      '//a[contains(@class, "complaint-summary-card__complaint-summary-card")]',
      '[.//div[contains(@class, "incident-date") and text()="Nov 30, 2016"]]'
    ),
  },
};
