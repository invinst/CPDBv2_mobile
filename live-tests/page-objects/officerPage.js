const metricSection = (selector) => ({
  selector,
  locateStrategy: 'xpath',
  elements: {
    value: '.value',
    name: '.name',
    description: '.description',
  },
});

const rowSection = (selector) => ({
  selector,
  locateStrategy: 'xpath',
  elements: {
    label: '.label',
    value: '.value',
  },
});

const explainer = (contentSections) => ({
  selector: '//div[contains(@class, "explainer-layout")]',
  locateStrategy: 'xpath',
  elements: {
    leftNav: '.left-nav',
    rightNav: '.right-nav',
  },
  sections: {
    radarChartContainer: {
      selector: '.explainer-radar-chart-container',
      elements: {
        radarChart: {
          selector: '//*[name()="svg" and contains(@class, "radar-chart")]',
          locateStrategy: 'xpath',
        },
        closeButton: '.explainer-close-button',
      },
    },
    explainerContent: {
      selector: '.explainer-content',
      elements: {
        title: '.title',
      },
      sections: contentSections,
    },
  },
});

const descriptionExplainer = explainer({
  descriptionContent: {
    selector: '//div[contains(@class, "description-content")]',
    locateStrategy: 'xpath',
    elements: {
      content: '.content',
      subContent: '.sub-content',
    },
  },
});

const nthPercentileRow = (n) => ({
  selector: `.percentiles-row:nth-child(${n})`,
  elements: {
    radarChart: 'svg',
    year: '.year',
    internalComplaint: '.cell:nth-child(3)',
    civilianComplaint: '.cell:nth-child(4)',
    useOfForce: '.cell:nth-child(5)',
  },
});

const nthUnitChangeSection = (n) => ({
  selector: `//div[contains(@class, "test--timeline-unit-change-item")][${n}]`,
  locateStrategy: 'xpath',
  elements: {
    unitChange: {
      selector: `(//div[contains(@class, "test--timeline-unit-change-item")][${n}])//span[@class="unit-change"]`,
      locateStrategy: 'xpath',
    },
    date: {
      selector: `(//div[contains(@class, "test--timeline-unit-change-item")][${n}])//span[@class="date"]`,
      locateStrategy: 'xpath',
    },
  },
});

const nthRankChangeSection = (n) => ({
  selector: `//div[contains(@class, "test--timeline-rank-change-item")][${n}]`,
  locateStrategy: 'xpath',
  elements: {
    rankChange: {
      selector: `(//div[contains(@class, "test--timeline-rank-change-item")][${n}])//span[@class="rank-change"]`,
      locateStrategy: 'xpath',
    },
    date: {
      selector: `(//div[contains(@class, "test--timeline-rank-change-item")][${n}])//span[@class="date"]`,
      locateStrategy: 'xpath',
    },
  },
});

const nthBreadcrumb = n => `.breadcrumb-item-wrapper:nth-child(${ 1 + 2 * (n - 1) })`;

module.exports = {
  url: function (id, tab = '') {
    const tabSuffix = tab ? `${tab}/` : '';
    return `${this.api.globals.clientUrl}/officer/${id}/${tabSuffix}`;
  },

  elements: {
    body: 'body',
    officerName: '.officer-name',
    mapTabButton: {
      selector: '(//span[contains(@class, "tabbed-pane-tab-name")])[2]',
      locateStrategy: 'xpath',
    },
    coaccusalsTabButton: {
      selector: '(//span[contains(@class, "tabbed-pane-tab-name")])[3]',
      locateStrategy: 'xpath',
    },
    attachmentsTabButton: {
      selector: '(//span[contains(@class, "tabbed-pane-tab-name")])[4]',
      locateStrategy: 'xpath',
    },
  },

  sections: {
    breadcrumbs: {
      selector: '.breadcrumbs',
      breadcrumbSelector: '.breadcrumbs > .breadcrumb-item-wrapper',
      elements: {
        wrapper: '.breadcrumb-item-wrapper',
        firstBreadcrumb: nthBreadcrumb(1),
        secondBreadcrumb: nthBreadcrumb(2),
        thirdBreadcrumb: nthBreadcrumb(3),
      },
    },
    animatedRadarChart: {
      selector: '//div[contains(@class, "animated-radar-chart")]',
      locateStrategy: 'xpath',
      elements: {
        radarChartContainer: '.radar-chart-container',
        noDataText: '.no-data-text',
      },
      sections: {
        radarChart: {
          selector: '//*[name()="svg" and contains(@class, "radar-chart")]',
          locateStrategy: 'xpath',
          elements: {
            radarAxis: {
              selector: '//*[name()="text" and contains(@class, "radar-axis")]',
              locateStrategy: 'xpath',
            },
            radarArea: {
              selector: '//*[name()="path" and contains(@class, "radar-area")]',
              locateStrategy: 'xpath',
            },
            radarGrid: '.test--radar-grid-wrapper',
          },
        },
      },
    },
    triangleExplainer: descriptionExplainer,
    scaleExplainer: descriptionExplainer,
    percentileExplainer: explainer({
      percentileContent: {
        selector: '//div[contains(@class, "percentile-explainer")]',
        locateStrategy: 'xpath',
        sections: {
          tableHeader: {
            selector: '.table-header',
            elements: {
              internalComplaintHeader: '.header-cell:nth-child(1)',
              civilianComplaintHeader: '.header-cell:nth-child(2)',
              useOfForceHeader: '.header-cell:nth-child(3)',
            },
          },
          percentileTable: {
            selector: '.percentile-table',
            sections: {
              firstRow: nthPercentileRow(1),
              secondRow: nthPercentileRow(2),
              thirdRow: nthPercentileRow(3),
            },
          },
        },
      },
    }),
    summary: {
      selector: '.officer-summary-body',
      elements: {
        demographic: '.officer-demographic',
      },

      sections: {
        badge: rowSection('//div[contains(@class, "section-row")][1]'),
        rank: rowSection('//div[contains(@class, "section-row")][2]'),
        unit: rowSection('//div[contains(@class, "section-row")][3]'),
        career: rowSection('//div[contains(@class, "section-row")][4]'),
      },
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
      },
    },
    timeline: {
      selector: '.test--officer-timeline',
      elements: {
        crItem: '.test--timeline-cr-item',
        trrItem: '.test--timeline-trr-item',
        awardItem: '.test--timeline-award-item',
        joinedItem: '.test--timeline-joined-item',
        yearItem: '.test--timeline-year-item',
        attachmentThumbnail: '.test--attachments .image',
      },
      sections: {
        firstUnitChangeItem: nthUnitChangeSection(1),
        secondUnitChangeItem: nthUnitChangeSection(2),
        firstRankChangeItem: nthRankChangeSection(1),
        secondRankChangeItem: nthRankChangeSection(2),
      },
    },
    coaccusals: {
      selector: '.test--officer-coaccusals',
      elements: {
        firstCoaccusalCard: '.test--officer-card',
      },
    },
    map: {
      selector: '.test--map',
    },
    attachments: {
      selector: '//div[contains(@class, "attachments-tab__officer-attachments-tab")]',
      locateStrategy: 'xpath',
      sections: {
        firstComplaint: {
          selector: '//div[contains(@class, "complaint__officer-attachments-tab-complaint")]',
          locateStrategy: 'xpath',
          elements: {
            firstAttachment: {
              selector: '//a[contains(@class, "attachment__officer-attachments-tab-complaint-attachment")]',
              locateStrategy: 'xpath',
            },
            heading: {
              selector: '//a[contains(@class, "heading__officer-attachments-tab-complaint-heading")]',
              locateStrategy: 'xpath',
            },
          },
        },
      },
    },
  },
};
