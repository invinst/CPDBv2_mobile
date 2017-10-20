module.exports = {
  url: function (id) {
    return `${this.api.globals.clientUrl}/faq/${id}/`;
  },

  elements: {
    sheetHeader: '.sheet-header',
    header: '.header',
    question: '.question',
    answer: '.answer'
  }
};
