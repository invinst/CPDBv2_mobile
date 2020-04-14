const nthMenuItemTitle = (n) => ({
  selector: `(//div[@class="pinboard-title"])[${n}]`,
  locateStrategy: 'xpath',
});
const nthMenuItemCreatedAt = (n) => ({
  selector: `(//div[@class="pinboard-created-at"])[${n}]`,
  locateStrategy: 'xpath',
});
const nthPinButton = (n) => ({
  selector: `(//div[@class="pin-button"])[${n}]`,
  locateStrategy: 'xpath',
});

module.exports = {
  url: function (crid) {
    return `${this.api.globals.clientUrl}/complaint/${crid}/`;
  },

  elements: {
    body: 'body',
    pinButton: {
      selector: '//div[contains(@class, "with-header__header")]//div[contains(@class, "item-pin-button")]',
      locateStrategy: 'xpath',
    },
    addToPinboardButton: {
      selector: '//div[contains(@class, "right-buttons")]//div',
      locateStrategy: 'xpath',
    },
    victims: '.victim-list',
    complainants: '.complainant-list',
    summary: {
      selector: '//div[contains(@class, "summary")]//div[contains(@class, "content")]',
      locateStrategy: 'xpath',
    },
    investigatorTimeline: {
      selector: '//div[contains(@class, "investigation-timeline")]//*[contains(@class, "svg")]',
      locateStrategy: 'xpath',
    },
    firstInvestigator: {
      selector: '(//*[contains(@class, "investigator-row")])[1]',
      locateStrategy: 'xpath',
    },
    secondInvestigator: {
      selector: '(//*[contains(@class, "investigator-row")])[2]',
      locateStrategy: 'xpath',
    },
    lastToast: {
      selector: '(//div[contains(@class, "Toastify__toast-body")])[last()]',
      locateStrategy: 'xpath',
    },
    landingPageBreadCrumb: {
      selector: '//a[@href="/" and .="cpdp"]',
      locateStrategy: 'xpath',
    },
    requestDocumentButton: '.request-button',
    incidentDate: '.incident-date-value',
  },

  sections: {
    complaintCategory: {
      selector: '//div[contains(@class, "complaint-category")]',
      locateStrategy: 'xpath',
      elements: {
        category: '.category',
        subcategory: '.subcategory',
      },
    },
    coaccusals: {
      selector: '//div[contains(@class, "accused-officers")]',
      locateStrategy: 'xpath',
      elements: {
        header: '.header',
        showAll: '.show-all',
        paddingBottom: '.padding-bottom',
      },
    },
    firstCoaccusal: {
      selector: '(//a[contains(@class, "coaccused-card")])[1]',
      locateStrategy: 'xpath',
      elements: {
        rank: '.officer-rank',
        name: '.officer-name',
        category: '.category',
        findingOutcome: '.finding-outcome',
        pinButton: {
          selector: '//div[@class="coaccusals"]//div[contains(@class, "item-pin-button__item-pin-button")]',
          locateStrategy: 'xpath',
        },
      },
    },
    firstAttachments: {
      selector: '//a[contains(@class, "attachment")])[1]',
      locateStrategy: 'xpath',
      elements: {
        title: '.attachment-title',
      },
    },
    location: {
      selector: '//div[contains(@class, "location__location")]',
      locateStrategy: 'xpath',
      elements: {
        address: '.address .info',
        type: '.type .info',
        beat: '.beat .info',
      },
    },
    requestDocumentForm: {
      selector: '//form[contains(@class, "request-document-content")]',
      locateStrategy: 'xpath',
      elements: {
        emailInput: '.email-input',
        requestButton: '.request-button',
        cancelButton: '.cancel-button',
        messageBox: '.message-box',
      },
    },
    pinboardsMenu: {
      selector: '//div[contains(@class, "pinboards-menu")]',
      locateStrategy: 'xpath',
      elements: {
        items: {
          selector: '//div[contains(@class, "pinboard-item")]',
          locateStrategy: 'xpath',
        },
        firstItemTitle: nthMenuItemTitle(1),
        firstItemCreatedAt: nthMenuItemCreatedAt(1),
        firstItemPinButton: nthPinButton(1),
        secondItemTitle: nthMenuItemTitle(2),
        secondItemCreatedAt: nthMenuItemCreatedAt(2),
        secondItemPinButton: nthPinButton(2),
        thirdItemTitle: nthMenuItemTitle(3),
        thirdItemCreatedAt: nthMenuItemCreatedAt(3),
        thirdItemPinButton: nthPinButton(3),
        createPinboardWithSelectionButton: '.add-to-new-pinboard',
      },
    },
  },
};
