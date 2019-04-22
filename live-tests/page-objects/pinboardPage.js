const baseRelevantComplaints = (type) => ({
  selector: `.relevant-${type}s`,
  elements: {
    title: '.relevant-infinite-carousel-title',
    carouselTip: '.relevant-infinite-carousel-tip',
  },
  sections: {
    [`${type}Card`]: {
      selector: '.swiper-slide > div:first-child',
      elements: {
        plusButton: {
          selector: `//div[contains(@class, "relevant-${type}s")]//div[contains(@class, "plus-button")]`,
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
      }
    }
  }
});


module.exports = {
  url: function (pinboardId) {
    return `${this.api.globals.clientUrl}/pinboard/${pinboardId}/pinboard-title/`;
  },

  sections: {
    pinnedSection: {
      selector: '.test--pinned-section',
      sections: {
        officers: {
          selector: '.test--OFFICER-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            firstCard: {
              selector: '.type-cards > a:first-child',
              elements: {
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardRank: '.officer-rank',
                firstCardName: '.officer-name',
                firstCardCRsCount: '.test--officer-cr-count',
              },
            }
          },
        },
        crs: {
          selector: '.test--CR-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            firstCard: {
              selector: '.type-cards > div:first-child',
              elements: {
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardDate: '.cr-incident-date',
                firstCardCategory: '.cr-category',
              }
            }
          },
        },
        trrs: {
          selector: '.test--TRR-section',
          elements: {
            title: '.type-title',
          },
          sections: {
            firstCard: {
              selector: '.type-cards > div:first-child',
              elements: {
                firstCardUnpinBtn: '.test--item-unpin-button',
                firstCardDate: '.trr-date',
                firstCardCategory: '.trr-category',
              }
            }
          }
        },
      }
    },
    graphNodes: {
      selector: '.node',
    },
    graphLinks: {
      selector: '.link',
    },
    timeline: {
      selector: '.graph-control-panel',
      elements: {
        toggleTimelineButton: '.toggle-timeline-btn',
      }
    },
    timelineSlider: {
      selector: '.test--timeline-slider',
    },
    biggestGraphNode: {
      selector: '(//*[@r="7"])',
      locateStrategy: 'xpath'
    },
    currentDate: {
      selector: '.current-date-label',
    },
    searchInput: {
      selector: '.graph-search-input',
    },
    firstSearchResultSuggestion: {
      selector: '.graph-search-input-container div div',
    },
    pinboardPaneMenu: {
      selector: '(//div[contains(@class, "pinboard-pane-section-menu")])',
      locateStrategy: 'xpath',
      elements: {
        networkPaneName: {
          selector: '//span[contains(@class, "pinboard-pane-tab-name")][1]',
          locateStrategy: 'xpath'
        },
        geographicPaneName: {
          selector: '//span[contains(@class, "pinboard-pane-tab-name")][2]',
          locateStrategy: 'xpath'
        }
      }
    },
  },

  elements: {
    socialGraphTitle: '.sidenav-title',
    coaccusalsThresholdText: '.coaccusals-threshold-text',
    startDate: '.start-date-label',
    endDate: '.end-date-label',
    pinboardTitle: '.pinboard-title',
    pinboardDescription: '.pinboard-description',
    pinboardPaneMenu: {
      selector: '(//div[contains(@class, "pinboard-pane-section-menu")])',
      locateStrategy: 'xpath'
    },
    complaintText: {
      selector: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-text")]',
      locateStrategy: 'xpath'
    },
    trrText: {
      selector: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-text")]',
      locateStrategy: 'xpath'
    },
    complaintNumber: {
      selector: '//div[contains(@class, "legend__legend")]//div[1]//span[contains(@class, "legend-row-number")]',
      locateStrategy: 'xpath'
    },
    trrNumber: {
      selector: '//div[contains(@class, "legend__legend")]//div[2]//span[contains(@class, "legend-row-number")]',
      locateStrategy: 'xpath'
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
          selector: '.swiper-slide > a:first-child',
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
          }
        }
      }
    },
  },
};
