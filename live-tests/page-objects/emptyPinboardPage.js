const nthExamplePinboardRow = n => ({
  selector: `//a[contains(@class, "example-pinboard-link__example-pinboard-link")][${n}]`,
  locateStrategy: 'xpath',
});

module.exports = {
  url: function (pinboardId) {
    return `${this.api.globals.clientUrl}/pinboard/${pinboardId}/`;
  },

  elements: {
    title: '.empty-pinboard-title',
    description: '.empty-pinboard-description',
    firstExamplePinboardRow: nthExamplePinboardRow(1),
    secondExamplePinboardRow: nthExamplePinboardRow(2),
  },
};
