module.exports = {
  url: function () {
    return `${this.api.globals.clientUrl}/faq/`;
  },

  elements: {
    sheetHeader: '.sheet-header',
    sticky: '.sticky'
  },

  sections: {
    faqRow: {
      selector: '.row[href="/faq/31/"]',
      elements: {
        question: '.question'
      }
    }
  }

};
