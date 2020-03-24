const nthOfficerCard = (n) => ({
  selector: `//a[contains(@class, "officer-card")]${ n ? `[${n}]` : ''}`,
  locateStrategy: 'xpath',
  elements: {
    officerName: '.officer-name',
    complaintCount: '.complaint-count',
  },
});

module.exports = {
  url: function () {
    return `${this.api.globals.clientUrl}/embed/top-officers-page`;
  },
  elements: {
    body: 'body',
    firstCard: nthOfficerCard(1),
    firstPinButton: {
      selector: '//div[contains(@class, "item-pin-button__item-pin-button")]',
      locateStrategy: 'xpath',
    },
  },
  sections: {
    cards: nthOfficerCard(),
  },
};
