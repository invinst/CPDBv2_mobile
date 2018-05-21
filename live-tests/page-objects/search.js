module.exports = {
  url: function () {
    return `${this.api.globals.clientUrl}/search/`;
  },

  elements: {
    queryInput: '.query-input',
    clearIcon: '.clear-icon',
    suggestedHeader: '#search-category-suggested',
    recentHeader: '#search-category-recent',
    officersHeader: '#search-category-officers',
  },

  sections: {

    suggested: {
      selector: '.suggested.body',
      sections: {

        officer: {
          selector: '.row.officer',
          elements: {
            label: '.suggested-type',
            value: '.suggested-title'
          }
        }
      }
    },

    recent: {
      selector: '.recent.body'
    },

    officers: {
      selector: '.body.officers',
      elements: {
        row: 'a[href="/officer/9876/"]'
      }
    },
  }
};
