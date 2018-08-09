const nthOfficerCard = (n) => ({
  selector: `//a[contains(@class, "officer-card")]${ n ? `[${n}]` : ''}`,
  locateStrategy: 'xpath',
  elements: {
    officerName: '.officer-name',
    complaintCount: '.complaint-count',
  }
});

module.exports = {
  url: function () {
    return `${this.api.globals.clientUrl}/embed/top-officers-page`;
  },
  elements: {
    firstCard: nthOfficerCard(1),
  },
  sections: {
    cards: nthOfficerCard(),
  },
};
