module.exports = {
  url: function (id) {
    return `${this.api.globals.clientUrl}/reporting/${id}/`;
  },

  elements: {
    'header': '.header',
    'title': '.report-title',
    'metadata': '.metadata'
  }
};
