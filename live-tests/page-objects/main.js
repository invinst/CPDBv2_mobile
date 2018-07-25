module.exports = {
  url: function () {
    return this.api.globals.clientUrl;
  },
  elements: {
    title: '.site-title',
    searchLink: 'a[href="/search/"]'
  }
};
