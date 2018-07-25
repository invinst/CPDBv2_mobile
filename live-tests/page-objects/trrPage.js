module.exports = {
  url: function (trrId) {
    return `${this.api.globals.clientUrl}/trr/${trrId}/`;
  },

  elements: {
    trrHeader: '.trr-header',
  },

  sections: {
    officer: {
      selector: '//div[contains(@class, "trr-officer")]',
      locateStrategy: 'xpath',
      elements: {
        officerRow: '.officer-row'
      }
    },
    info: {
      selector: '//div[contains(@class, "trr-info")]',
      locateStrategy: 'xpath',
      elements: {
        requestDocumentButton: '.request-button'
      }
    },
    requestDocumentForm: {
      selector: '//form[contains(@class, "request-document-content")]',
      locateStrategy: 'xpath',
      elements: {
        emailInput: '.email-input',
        requestButton: '.request-button',
        cancelButton: '.cancel-button',
        messageBox: '.message-box'
      }
    }
  }
};
