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
    faqsHeader: '#search-category-faqs',
  },

  sections: {

    suggested: {
      selector: '.suggested.body',
      sections: {

        faq: {
          selector: '.row.faq',
          elements: {
            label: '.suggested-type',
            value: '.suggested-title'
          }
        },

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
    faqs: {
      selector: '.body.faqs',
      elements: {
        row1: 'a[href="/faq/24/"]',
        row2: 'a[href="/faq/27/"]'
      }
    }
  }
};
