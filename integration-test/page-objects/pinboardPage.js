const baseRelevantComplaints = (type) => ({
  selector: `.relevant-${type}s`,
  elements: {
    title: '.relevant-infinite-carousel-title',
    carouselTip: '.relevant-infinite-carousel-tip',
  },
  sections: {
    [`${type}Card`]: {
      selector: `.relevant-${type}s .swiper-slide > div:first-child`,
      elements: {
        plusButton: {
          selector: `//div[contains(@class, "relevant-${type}s")]` +
            '//span[contains(@class, "swiper-slide")][1]//div[contains(@class, "plus-button")]',
          locateStrategy: 'xpath',
        },
        incidentDate: '.incident-date',
        category: '.category',
        firstTopOfficerName: '.top-officer-row-officer-name',
        secondTopOfficerName: '.top-officer-row:nth-child(2) .top-officer-row-officer-name',
        notShowingOfficerCount: '.not-showing-officer-count',
        leftHalf: '.left-half',
        topOfficers: '.top-officers',
        remainingOfficers: '.remaining-officers',
        undoText: '.undo-card-text',
        undoButton: '.undo-button',
        firstRadarChart: {
          locateStrategy: 'xpath',
          selector: '//*[name()="svg" and contains(@class, "radar-chart__radar-chart")]',
        },
      },
    },
  },
});

const nthPinboardItem = (index) => {
  const parentSelector = `(//div[contains(@class, "Modal")]/div/div[contains(@class, "pinboard-item")])[${index}]`;
  return {
    selector: parentSelector,
    locateStrategy: 'xpath',
    elements: {
      title: {
        selector: `${parentSelector}//div[@class="pinboard-title"]`,
        locateStrategy: 'xpath',
      },
      viewedAt: {
        selector: `${parentSelector}//div[@class="pinboard-viewed-at"]`,
        locateStrategy: 'xpath',
      },
      actionsButton: {
        selector: `${parentSelector}//div[contains(@class, "pinboard-item-actions-btn")]`,
        locateStrategy: 'xpath',
      },
      actionsPane: {
        selector: `${parentSelector}//div[contains(@class, "pinboard-item-actions-menu")]`,
        locateStrategy: 'xpath',
      },
      duplicateButton: {
        selector: `${parentSelector}//div[@class="duplicate-pinboard-btn"]`,
        locateStrategy: 'xpath',
      },
      removeButton: {
        selector: `${parentSelector}//div[@class="remove-pinboard-btn"]`,
        locateStrategy: 'xpath',
      },
      spinner: {
        selector: `${parentSelector}//img[@class="spinner"]`,
        locateStrategy: 'xpath',
      },
    },
  };
};

const summarySectionSelectorByTitle = (title) => (
  `//div[contains(@class, "widget__widget")]/div[contains(text(), "${title}")]/..`
);

const summaryWidgetSection = (title) => {
  const parentSelector = summarySectionSelectorByTitle(title);
  const firstSummaryItemSelector = `(${parentSelector}//div[@class="summary-item"])[1]`;
  const secondSummaryItemSelector = `(${parentSelector}//div[@class="summary-item"])[2]`;
  return {
    locateStrategy: 'xpath',
    selector: parentSelector,
    elements: {
      widgetTitle: {
        locateStrategy: 'xpath',
        selector: `${parentSelector}//div[contains(@class, "widget-title")]`,
      },
      spinner: {
        locateStrategy: 'xpath',
        selector: `${parentSelector}//*[contains(@class, "widget__widget-spinner")]`,
      },
      firstSummaryItemTitle: {
        locateStrategy: 'xpath',
        selector: `${firstSummaryItemSelector}//div[contains(@class, "item-title")]`,
      },
      firstSummaryItemCount: {
        locateStrategy: 'xpath',
        selector: `${firstSummaryItemSelector}//div[contains(@class, "item-count")]`,
      },
      secondSummaryItemTitle: {
        locateStrategy: 'xpath',
        selector: `${secondSummaryItemSelector}//div[contains(@class, "item-title")]`,
      },
      secondSummaryItemCount: {
        locateStrategy: 'xpath',
        selector: `${secondSummaryItemSelector}//div[contains(@class, "item-count")]`,
      },
      summaryItems: {
        locateStrategy: 'xpath',
        selector: `${parentSelector}//div[@class="summary-item"]`,
      },
    },
  };
};

const demographicBarSelector = (parentSelector, index) => ({
  locateStrategy: 'xpath',
  selector: `${parentSelector}//*[@class="bar-chart"]//*[${index}]`,
});
const demographicPercentageSelector = (parentSelector, index) => ({
  locateStrategy: 'xpath',
  selector: `${parentSelector}//*[contains(@class, "bar-chart-precentage")][${index}]`,
});
const demographicLabelSelector = (parentSelector, index) => ({
  locateStrategy: 'xpath',
  selector: `${parentSelector}//*[contains(@class, "bar-chart-label")]/*[${index}]`,
});

const demographicChartSection = (parentSelector, chartIndex) => {
  const mainSelector = `(${parentSelector}//*[contains(@class, "demographic-chart__demographic-chart")])` +
  `[${chartIndex}]`;
  return {
    locateStrategy: 'xpath',
    selector: mainSelector,
    elements: {
      firstBar: demographicBarSelector(mainSelector, 1),
      firstPercentage: demographicPercentageSelector(mainSelector, 1),
      firstLabel: demographicLabelSelector(mainSelector, 1),
      secondBar: demographicBarSelector(mainSelector, 2),
      secondPercentage: demographicPercentageSelector(mainSelector, 2),
      secondLabel: demographicLabelSelector(mainSelector, 2),
      thirdBar: demographicBarSelector(mainSelector, 3),
      thirdPercentage: demographicPercentageSelector(mainSelector, 3),
      thirdLabel: demographicLabelSelector(mainSelector, 3),
      fourthBar: demographicBarSelector(mainSelector, 4),
      fourthPercentage: demographicPercentageSelector(mainSelector, 4),
      fourthLabel: demographicLabelSelector(mainSelector, 4),
      charts: {
        locateStrategy: 'xpath',
        selector: `${mainSelector}//*[@class="bar-chart"]/*`,
      },
    },
  };
};

const demographicWidgetSection = (title) => {
  const parentSelector = summarySectionSelectorByTitle(title);
  return {
    locateStrategy: 'xpath',
    selector: parentSelector,
    elements: {
      widgetTitle: {
        locateStrategy: 'xpath',
        selector: `${parentSelector}//div[contains(@class, "widget-title")]`,
      },
      spinner: {
        locateStrategy: 'xpath',
        selector: `${parentSelector}//*[contains(@class, "widget__widget-spinner")]`,
      },
    },
    sections: {
      raceSection: demographicChartSection(parentSelector, 1),
      genderSection: demographicChartSection(parentSelector, 2),
    },
  };
};

module.exports = {
  url: function (pinboardId, queryString) {
    if (queryString) {
      return `${this.api.globals.clientUrl}/pinboard/${queryString}`;
    }
    if (!pinboardId)
      return `${this.api.globals.clientUrl}/pinboard/`;
    return `${this.api.globals.clientUrl}/pinboard/${pinboardId}/pinboard-title/`;
  },

  elements: {
    body: 'body',
    header: '.header-parent',
    highlightedMenuItem: '.menu-item.highlight',
    searchBar: '.search-box',
    pinboardsListButton: '.pinboards-list-btn',
    socialGraphTitle: '.sidenav-title',
    socialGraph: {
      locateStrategy: 'xpath',
      selector: '//div[contains(@class, "animated-social-graph")]',
    },
    visualizationTitle: '.visualization-title',
    pinboardTitle: '.pinboard-title',
    pinboardDescription: '.pinboard-description',
    navigationNextButton: '.swiper-button-next',
    navigationPreviousButton: '.swiper-button-prev',
    refreshButton: '.refresh-button',
    firstBullet: {
      locateStrategy: 'xpath',
      selector: '//span[contains(@class, "swiper-pagination-bullet")][1]',
    },
    secondBullet: {
      locateStrategy: 'xpath',
      selector: '//span[contains(@class, "swiper-pagination-bullet")][2]',
    },
    complaintText: {
      selector: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-text")]',
      locateStrategy: 'xpath',
    },
    trrText: {
      selector: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-text")]',
      locateStrategy: 'xpath',
    },
    complaintNumber: {
      selector: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-number")]',
      locateStrategy: 'xpath',
    },
    trrNumber: {
      selector: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-number")]',
      locateStrategy: 'xpath',
    },
    biggestGraphNode: {
      selector: '(//*[@r="7"])',
      locateStrategy: 'xpath',
    },
    firstToast: '.Toastify__toast:first-child',
    secondToast: '.Toastify__toast:nth-child(2)',
  },

  sections: {
    pinnedSection: {
      selector: 'div.pinned-section',
      sections: {
        officers: {
          selector: '.test--OFFICER-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            card: {
              selector: '.test--OFFICER-section .pinned-grid-item',
            },
            firstCard: {
              selector: '.pinned-grid-item:first-child',
              elements: {
                mainElement: {
                  selector: '.',
                  locateStrategy: 'xpath',
                },
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardRank: '.officer-rank',
                firstCardName: '.officer-name',
                firstCardCRsCount: '.test--officer-cr-count',
                undoButton: '.undo-button',
                undoCard: {
                  selector: '//div[starts-with(@class, "with-undo-card")]',
                  locateStrategy: 'xpath',
                },
              },
            },
            secondCard: {
              selector: '.pinned-grid-item:nth-child(2)',
              elements: {
                officerName: '.officer-name',
              },
            },
          },
        },
        crs: {
          selector: '.test--CR-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            card: {
              selector: '.test--CR-section .pinned-grid-item',
            },
            firstCard: {
              selector: '.pinned-grid-item:first-child',
              elements: {
                mainElement: {
                  selector: '.',
                  locateStrategy: 'xpath',
                },
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardDate: '.location-card-date',
                firstCardCategory: '.location-card-category',
                undoButton: '.undo-button',
                undoCard: {
                  selector: '//div[starts-with(@class, "with-undo-card")]',
                  locateStrategy: 'xpath',
                },
              },
            },
            secondCard: {
              selector: '.pinned-grid-item:nth-child(2)',
              elements: {
                category: '.location-card-category',
              },
            },
            lastCardCategory: {
              selector: '.test--CR-section .pinned-grid-item:last-child .location-card-category',
            },
          },
        },
        trrs: {
          selector: '.test--TRR-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            card: {
              selector: '.test--TRR-section .pinned-grid-item',
            },
            firstCard: {
              selector: '.pinned-grid-item:first-child',
              elements: {
                mainElement: {
                  selector: '.',
                  locateStrategy: 'xpath',
                },
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardDate: '.location-card-date',
                firstCardCategory: '.location-card-category',
                undoButton: '.undo-button',
                undoCard: {
                  selector: '//div[starts-with(@class, "with-undo-card")]',
                  locateStrategy: 'xpath',
                },
              },
            },
          },
        },
      },
    },
    animatedSocialGraphSection: {
      locateStrategy: 'xpath',
      selector: summarySectionSelectorByTitle('SOCIAL GRAPH'),
    },
    geographicSection: {
      locateStrategy: 'xpath',
      selector: summarySectionSelectorByTitle('GEOGRAPHIC MAP'),
    },
    complaintSummaryWidget: summaryWidgetSection('COMPLAINT SUMMARY'),
    trrSummaryWidget: summaryWidgetSection('TACTICAL RESPONSE REPORT SUMMARY'),
    officersSummaryWidget: demographicWidgetSection('OFFICERS'),
    complainantsSummaryWidget: demographicWidgetSection('COMPLAINANTS'),
    graphNodes: {
      selector: '.node',
    },
    shownGraphNodes: {
      selector: '//*[name()="circle" and contains(@class, "node") and contains(@style, "opacity: 1")]',
      locateStrategy: 'xpath',
    },
    hiddenGraphNodes: {
      selector: '//*[name()="circle" and contains(@class, "node") and contains(@style, "opacity: 0.1")]',
      locateStrategy: 'xpath',
    },
    graphLinks: {
      selector: '.link',
    },
    shownGraphLinks: {
      selector: '//*[name()="line" and contains(@class, "link") and contains(@style, "opacity: 1")]',
      locateStrategy: 'xpath',
    },
    hiddenGraphLinks: {
      selector: '//*[name()="line" and contains(@class, "link") and contains(@style, "opacity: 0.1")]',
      locateStrategy: 'xpath',
    },
    relevantComplaints: baseRelevantComplaints('complaint'),
    relevantDocuments: baseRelevantComplaints('document'),
    relevantCoaccusals: {
      selector: '.relevant-coaccusals',
      elements: {
        title: '.relevant-infinite-carousel-title',
        carouselTip: '.relevant-infinite-carousel-tip',
      },
      sections: {
        coaccusalCard: {
          selector: '.relevant-coaccusals .swiper-slide > *:first-child',
          elements: {
            plusButton: {
              selector: '//div[contains(@class, "relevant-coaccusals")]//div[contains(@class, "plus-button")]',
              locateStrategy: 'xpath',
            },
            officerRank: '.officer-card-rank',
            officerName: '.officer-card-name',
            coaccusalCount: '.coaccusal-count',
            nameWrapper: '.officer-card-name-wrapper',
            undoText: '.undo-card-text',
            undoButton: '.undo-button',
            radarChart: {
              selector: '//*[name()="svg" and contains(@class, "radar-chart__radar-chart")]',
              locateStrategy: 'xpath',
            },
          },
        },
      },
    },
    pinboardsListSection: {
      selector: '//div[contains(@class, "pinboards__pinboards")]',
      locateStrategy: 'xpath',
      elements: {
        pinboardsTitle: '.pinboards-title',
        createNewPinboardButton: '.new-pinboard-btn',
        pinboardActionsPane: {
          selector: '//div[@class="pinboard-item-actions-menu"]',
          locateStrategy: 'xpath',
        },
        duplicatePinboardButton: {
          selector: '(//a[contains(@class, "duplicate-pinboard-btn")])[1]',
          locateStrategy: 'xpath',
        },
        removePinboardButton: {
          selector: '(//a[contains(@class, "remove-pinboard-btn")])[1]',
          locateStrategy: 'xpath',
        },
        pinboardItems: '.pinboard-item',
      },
      sections: {
        firstPinboardItem: nthPinboardItem(1),
        secondPinboardItem: nthPinboardItem(2),
        thirdPinboardItem: nthPinboardItem(3),
      },
    },
  },
};
