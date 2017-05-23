module.exports = {
  url: function () {
    return `${this.api.globals.clientUrl}/reporting/`;
  },

  elements: {
    sheetHeader: '.sheet-header'
  },

  sections: {
    reportingRow: {
      selector: '.reporting-item-row[href="/reporting/215/"]',
      elements: {
        title: '.title',
        publication: '.publication',
        publishDate: '.publish-date'
      }
    }
  }
};
