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
      },
    },
  },
});


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
    searchBar: {
      locateStrategy: 'xpath',
      selector: '(//a[starts-with(@class, "search-bar")])',
    },
    socialGraphTitle: '.sidenav-title',
    coaccusalsThresholdText: '.coaccusals-threshold-text',
    startDate: '.start-date-label',
    endDate: '.end-date-label',
    playButton: '.play-icon',
    pinboardTitle: '.pinboard-title',
    pinboardDescription: '.pinboard-description',
    pinboardPaneMenu: {
      selector: '(//div[contains(@class, "pinboard-pane-section-menu")])',
      locateStrategy: 'xpath',
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
    currentDate: '.current-date-label',
    biggestGraphNode: {
      selector: '(//*[@r="7"])',
      locateStrategy: 'xpath',
    },
    timelineSlider: '.test--timeline-slider',
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
              selector: '.test--OFFICER-section .type-cards > .pinned-grid-item',
            },
            firstCard: {
              selector: '.type-cards > .pinned-grid-item:first-child',
              elements: {
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
              selector: '.type-cards > .pinned-grid-item:nth-child(2)',
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
              selector: '.test--CR-section .type-cards > .pinned-grid-item',
            },
            firstCard: {
              selector: '.type-cards > .pinned-grid-item:first-child',
              elements: {
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
              selector: '.type-cards > .pinned-grid-item:nth-child(2)',
              elements: {
                category: '.location-card-category',
              },
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
              selector: '.test--TRR-section .type-cards > .pinned-grid-item',
            },
            firstCard: {
              selector: '.type-cards > .pinned-grid-item:first-child',
              elements: {
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
    timeline: {
      selector: '.graph-control-panel',
      elements: {
        toggleTimelineButton: '.toggle-timeline-btn',
      },
    },
    pinboardPaneMenu: {
      selector: '(//div[contains(@class, "pinboard-pane-section-menu")])',
      locateStrategy: 'xpath',
      elements: {
        networkPaneName: {
          selector: '//span[contains(@class, "pinboard-pane-tab-name")][1]',
          locateStrategy: 'xpath',
        },
        geographicPaneName: {
          selector: '//span[contains(@class, "pinboard-pane-tab-name")][2]',
          locateStrategy: 'xpath',
        },
      },
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
            radarChart: '.radar-chart-wrapper',
            officerRank: '.officer-card-rank',
            officerName: '.officer-card-name',
            coaccusalCount: '.coaccusal-count',
            nameWrapper: '.officer-card-name-wrapper',
            undoText: '.undo-card-text',
            undoButton: '.undo-button',
          },
        },
      },
    },
  },
};
