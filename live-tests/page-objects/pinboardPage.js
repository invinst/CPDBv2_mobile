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

  elements: {
    socialGraphTitle: {
      selector: '.sidenav-title',
    },
    coaccusalsThresholdText: {
      selector: '.coaccusals-threshold-text',
    },
    startDate: {
      selector: '.start-date-label',
    },
    endDate: {
      selector: '.end-date-label',
    },
    pinboardTitle: {
      selector: '.pinboard-title',
    },
    pinboardDescription: {
      selector: '.pinboard-description',
    },
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

  },

  sections: {
    graphNodes: {
      selector: '.node',
    },
    graphLinks: {
      selector: '.link',
    },
    timeline: {
      selector: '.graph-control-panel',
      elements: {
        toggleTimelineButton: {
          selector: '.toggle-timeline-btn',
        }
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
  }
};
