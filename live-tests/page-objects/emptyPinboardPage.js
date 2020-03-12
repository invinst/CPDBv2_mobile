const nthExamplePinboardRow = n => ({
  selector: `//a[contains(@class, "example-pinboard-link__example-pinboard-link")][${n}]`,
  locateStrategy: 'xpath',
});

const nthExampleTitle = n => ({
  selector: `//a[contains(@class, "example-pinboard-link")][${n}]//div[@class="title"]`,
  locateStrategy: 'xpath',
});

const nthExampleDescription = n => ({
  selector: `//a[contains(@class, "example-pinboard-link")][${n}]//div[contains(@class, "description")]`,
  locateStrategy: 'xpath',
});

module.exports = {
  url: function (pinboardId) {
    if (!pinboardId)
      return `${this.api.globals.clientUrl}/pinboard/`;
    return `${this.api.globals.clientUrl}/pinboard/${pinboardId}/`;
  },

  elements: {
    body: 'body',
    title: '.empty-pinboard-title',
    description: '.empty-pinboard-description',
    firstExamplePinboardRow: nthExamplePinboardRow(1),
    firstExampleTitle: nthExampleTitle(1),
    firstExampleDescription: nthExampleDescription(1),
    secondExamplePinboardRow: nthExamplePinboardRow(2),
    secondExampleTitle: nthExampleTitle(2),
    secondExampleDescription: nthExampleDescription(2),
  },
};
