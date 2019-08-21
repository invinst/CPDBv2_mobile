const nthOfficerCard = (n) => ({
  selector: `//a[contains(@class, "officer-card")]${ n ? `[${n}]` : ''}`,
  locateStrategy: 'xpath',
  elements: {
    officerName: '.officer-name',
    complaintCount: '.complaint-count',
  },
});

module.exports = {
  url: function (params) {
    return `${this.api.globals.clientUrl}/embed/officers/${params}`;
  },
  elements: {
    body: 'body',
    title: '.carousel-title',
    description: '.carousel-description',
    firstCard: nthOfficerCard(1),
  },
  sections: {
    cards: nthOfficerCard(),
  },
};
