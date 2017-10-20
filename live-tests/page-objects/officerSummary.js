module.exports = {
  url: function (id) {
    return `${this.api.globals.clientUrl}/officer/${id}/`;
  },

  elements: {
    header: '.sheet-header',
    activeLink: '.officer-link.active'
  },

  sections: {
    assignmentDetails: {
      selector: '.assignment-detail-section',
    },

    stats: {
      selector: '.test--summary-stats-section',
      elements: {
        verbalAbuseRow: '.facet:nth-child(2) .facet-entry-count.sustained'
      },

      sections: {
        complaintCounts: {
          selector: '.complaint-counts',
          elements: {
            totalCount: '.total-count',
            sustainedCount: '.sustained-count',
          }
        }
      }
    }
  }
};
