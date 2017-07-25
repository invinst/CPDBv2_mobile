module.exports = {
  url: function () {
    return this.api.globals.clientUrl;
  },
  elements: {
    cpdbLogo: '.cpdb-logo',
    reportingLink: 'a[href="/reporting/"]',
    faqLink: 'a[href="/faq/"]',
    aboutLink: 'a[href="/about/"]',
    searchLink: 'a[href="/search/"]'
  }
};
