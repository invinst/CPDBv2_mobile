const emptyPinboardId = '11613bb2';

const nthExamplePinboardRow = n => `.helper-row:nth-child(${n + 2})`;

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
