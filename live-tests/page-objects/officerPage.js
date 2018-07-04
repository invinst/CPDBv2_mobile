const metricSection = (selector) => ({
  selector,
  locateStrategy: 'xpath',
  elements: {
    value: '.value',
    name: '.name',
    description: '.description'
  }
});

const rowSection = (selector) => ({
  selector,
  locateStrategy: 'xpath',
  elements: {
    label: '.label',
    value: '.value'
  }
});

module.exports = {
  url: function (id) {
    return `${this.api.globals.clientUrl}/officer/${id}/`;
  },

  elements: {
    officerName: '.officer-name',
  },

  sections: {
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
    summary: {
      selector: '.officer-summary-body',
      elements: {
        demographic: '.officer-demographic',
        badgeToggle: '.historic-badges-toggle',
        historicBadgesContainer: '.historic-badges-container'
      },

      sections: {
        badge: rowSection('//div[contains(@class, "section-row")][1]'),
        rank: rowSection('//div[contains(@class, "section-row")][2]'),
        unit: rowSection('//div[contains(@class, "section-row")][3]'),
        career: rowSection('//div[contains(@class, "section-row")][4]'),
      }
    },
    metrics: {
      selector: '//div[contains(@class, "metric-widget")]',
      locateStrategy: 'xpath',
      sections: {
        allegationItem: metricSection('(//div[contains(@class, "metric-widget-item")][1])[1]'),
        sustainedItem: metricSection('(//div[contains(@class, "metric-widget-item")][2])[1]'),
        trrItem: metricSection('(//div[contains(@class, "metric-widget-item")][1])[2]'),
        complimentItem: metricSection('(//div[contains(@class, "metric-widget-item")][2])[2]'),
        awardItem: metricSection('(//div[contains(@class, "metric-widget-item")][1])[3]'),
        honorableMentionItem: metricSection('(//div[contains(@class, "metric-widget-item")][2])[3]'),
      }
    },
    timeline: {
      selector: '.test--officer-timeline',
      elements: {
        crItem: '.test--timeline-cr-item',
        trrItem: '.test--timeline-trr-item',
        awardItem: '.test--timeline-award-item',
        unitChangeItem: '.test--timeline-unit-change-item',
        joinedItem: '.test--timeline-joined-item',
        yearItem: '.test--timeline-year-item',
        attachmentThumbnail: '.test--attachments .image',
      }
    }
  }
};
