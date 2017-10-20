module.exports = {
  url: function () {
    return this.api.globals.clientUrl;
  },
  elements: {
    cpdbLogo: '.title',
    searchLink: 'a[href="/search/"]'
  }
};
