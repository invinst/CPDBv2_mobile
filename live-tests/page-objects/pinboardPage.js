module.exports = {
  url: function (pinboardId) {
    return `${this.api.globals.clientUrl}/pinboard/${pinboardId}/pinboard-title/`;
  },

  elements: {
    socialGraphTitle: '.sidenav-title',
    coaccusalsThresholdText:'.coaccusals-threshold-text',
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
  }
};
