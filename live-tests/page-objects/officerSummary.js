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
      elements: {
        header: 'div:first-child'
      }
    },

    demographics: {
      selector: '.demographics-section',
      elements: {
        header: 'div:first-child'
      }
    },

    stats: {
      selector: '.test--summary-stats-section',
      elements: {
        header: 'div:first-child',
        verbalAbuseRow: '.facet:nth-child(3) .facet-entry-count.sustained'
      },
      sections: {
        totalRow: {
          selector: '.facet-entry.total',
          elements: {
            totalCount: '.facet-entry-count',
            sustainedCount: '.facet-entry-count.sustained',
            label: '.facet-entry-name'
          }
        }
      }
    }

  }
};
