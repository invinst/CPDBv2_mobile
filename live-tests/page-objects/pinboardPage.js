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
  }
};
