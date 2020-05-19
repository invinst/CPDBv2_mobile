const nthPoliceWitnessRadarChart = (index) => ({
  locateStrategy: 'xpath',
  selector: `//a[contains(@class, "police-witness-row")][${index}]//*[name()="svg"]`
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
    policeWitnesses: {
      selector: '//div[contains(@class, "police-witness__police-witness")]',
      locateStrategy: 'xpath',
      elements: {
        firstRadarChart: nthPoliceWitnessRadarChart(1),
        secondRadarChart: nthPoliceWitnessRadarChart(2),
        thirdRadarChart: nthPoliceWitnessRadarChart(3),
        forthRadarChart: nthPoliceWitnessRadarChart(4),
        fifthRadarChart: nthPoliceWitnessRadarChart(5),
      },
    },
  },
};
