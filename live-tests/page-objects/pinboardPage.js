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
  }
};
