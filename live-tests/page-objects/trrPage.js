module.exports = {
  url: function (trrId) {
    return `${this.api.globals.clientUrl}/trr/${trrId}/`;
  },

  elements: {
    trrHeader: '.trr-header',
  },

  sections: {
    officer: {
      selector: '//div[contains(@class, "trr-officer")]',
      locateStrategy: 'xpath',
      elements: {
        officerRow: '.officer-row'
      }
    }
  }
};
