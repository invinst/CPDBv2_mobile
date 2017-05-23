module.exports = {
  url: function (id) {
    return `${this.api.globals.clientUrl}/officer/${id}/timeline/`;
  },

  elements: {
    header: '.sheet-header',
    activeLink: '.officer-link.active',
    yearlyStats2005: '.test--yearly-stats-2005',
    crItem: '.test--cr-item-309887',
    lastItem: '.last-item'
  }
};
