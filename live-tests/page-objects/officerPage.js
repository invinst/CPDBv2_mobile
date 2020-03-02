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

const nthUnitChangeSection = (n) => {
  const mainElementSelector = `//span[contains(@class, "unit-change__wrapper")][${n}]`;
  return {
    selector: mainElementSelector,
    locateStrategy: 'xpath',
    elements: {
      unitChange: {
        selector: `(${mainElementSelector})//span[@class="unit-change content"]`,
        locateStrategy: 'xpath',
      },
      date: {
        selector: `(${mainElementSelector})//span[@class="date content"]`,
        locateStrategy: 'xpath',
      },
    },
  };
};

const nthRankChangeSection = (n) => {
  const mainElementSelector = `//span[contains(@class, "rank-change__wrapper")][${n}]`;
  return {
    selector: mainElementSelector,
    locateStrategy: 'xpath',
    elements: {
      rankChange: {
        selector: `(${mainElementSelector})//span[@class="rank-change content"]`,
        locateStrategy: 'xpath',
      },
      date: {
        selector: `(${mainElementSelector})//span[@class="date content"]`,
        locateStrategy: 'xpath',
      },
    },
  };
};

const nthBreadcrumb = n => `//*[contains(@class, "breadcrumb-item")][${n}]`;

module.exports = {
  url: function (id, tab = '') {
    const tabSuffix = tab ? `${tab}/` : '';
    return `${this.api.globals.clientUrl}/officer/${id}/${tabSuffix}`;
  },

  elements: {
    body: 'body',
    officerName: '.officer-name',
    pinButton: {
      selector: '//div[contains(@class, "with-header__header")]//div[contains(@class, "item-pin-button")]',
      locateStrategy: 'xpath',
    },
    timelineTabButton: {
      selector: '(//span[contains(@class, "tabbed-pane-tab-name")])[1]',
      locateStrategy: 'xpath',
    },
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
    lastToast: {
      selector: '(//div[contains(@class, "Toastify__toast-body")])[last()]',
      locateStrategy: 'xpath',
    },
    landingPageBreadCrumb: {
      selector: '//a[@href="/" and .="cpdp"]',
      locateStrategy: 'xpath',
    },
    searchBreadcrumb: {
      selector: nthBreadcrumb(2),
      locateStrategy: 'xpath',
    },
  },

  sections: {
    breadcrumbs: {
      selector: '//div[contains(@class, "breadcrumb__breadcrumb")]',
      locateStrategy: 'xpath',
      elements: {
        firstBreadcrumb: {
          selector: nthBreadcrumb(1),
          locateStrategy: 'xpath',
        },
        secondBreadcrumb: {
          selector: nthBreadcrumb(2),
          locateStrategy: 'xpath',
        },
        thirdBreadcrumb: {
          selector: nthBreadcrumb(3),
          locateStrategy: 'xpath',
        },
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
      selector: '//div[contains(@class, "timeline__officer-timeline")]',
      locateStrategy: 'xpath',
      elements: {
        crItem: {
          selector: '//a[contains(@class, "cr__wrapper") and contains(@class, "normal-item")]',
          locateStrategy: 'xpath',
        },
        trrItem: {
          selector: '//a[contains(@class, "trr__wrapper") and contains(@class, "normal-item")]',
          locateStrategy: 'xpath',
        },
        awardItem: {
          selector: '//div[contains(@class, "award__wrapper") and contains(@class, "normal-item")]',
          locateStrategy: 'xpath',
        },
        joinedItem: {
          selector: '//span[contains(@class, "joined__wrapper") and contains(@class, "joined-item")]',
          locateStrategy: 'xpath',
        },
        yearItem: {
          selector: '//div[contains(@class, "year__wrapper") and contains(@class, "normal-item")]',
          locateStrategy: 'xpath',
        },
        unitChangeItem: {
          selector: '//span[contains(@class, "unit-change__wrapper") and contains(@class, "change-item")]',
          locateStrategy: 'xpath',
        },
        rankChangeItem: {
          selector: '//span[contains(@class, "rank-change__wrapper") and contains(@class, "change-item")]',
          locateStrategy: 'xpath',
        },
        attachmentThumbnail: '.test--attachments .image',
      },
      sections: {
        firstUnitChangeItem: nthUnitChangeSection(1),
        secondUnitChangeItem: nthUnitChangeSection(2),
        firstRankChangeItem: nthRankChangeSection(1),
        secondRankChangeItem: nthRankChangeSection(2),
        crItems: {
          selector: '//a[contains(@class, "cr__wrapper") and contains(@class, "normal-item")]',
          locateStrategy: 'xpath',
        },
        filter: {
          selector: '.timeline-filter',
          elements: {
            selectedFilter: '.dropdown-button-text',
            button: '.dropdown-button',
            menu: '.dropdown-menu',
            crs: '.dropdown-menu-item:nth-child(1)',
            sustained: '.dropdown-menu-item:nth-child(2)',
            force: '.dropdown-menu-item:nth-child(3)',
            awards: '.dropdown-menu-item:nth-child(4)',
            changes: '.dropdown-menu-item:nth-child(5)',
          },
        },
      },
    },
    coaccusals: {
      selector: '.test--officer-coaccusals',
      elements: {
        firstCoaccusalCard: '.test--officer-card',
        firstPinButton: {
          selector: '//div[@class="coaccusals-group-items"]//div[contains(@class, "item-pin-button")]',
          locateStrategy: 'xpath',
        },
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
