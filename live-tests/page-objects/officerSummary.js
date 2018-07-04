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
    animatedRadarChart: {
      selector: '//div[contains(@class, "animated--radar-chart")]',
      locateStrategy: 'xpath',
      sections: {
        radarChart: {
          selector: '//*[name()="svg" and contains(@class, "radar-chart")]',
          locateStrategy: 'xpath',
          elements: {
            radarAxis: {
              selector: '//*[name()="g" and contains(@class, "radar-axis")]',
              locateStrategy: 'xpath'
            },
            radarArea: {
              selector: '//*[name()="path" and contains(@class, "radar-area")]',
              locateStrategy: 'xpath'
            },
            radarGrid: '.test--radar-grid-wrapper',
          },
        },
      }
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
