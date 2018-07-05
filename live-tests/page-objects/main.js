module.exports = {
  url: function () {
    return this.api.globals.clientUrl;
  },
  elements: {
    cpdbLogo: '.title',
    searchLink: 'a[href="/search/"]',
    intercomOpenIcon: '.intercom-launcher-open-icon',
    intercomCloseButton: '.intercom-home-screen-header-close-button',
    intercomHomeScreen: '.intercom-home-screen-body',
  }
};
