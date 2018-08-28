const resultsSection = (name) => ({
  selector: `.results.${name}`,
  sections: {
    firstRow: nthRow(1),
    secondRow: nthRow(2),
    thirdRow: nthRow(3),
  }
});

const nthRow = (n) => ({
  selector: `a:nth-child(${n})`,
  elements: {
    itemType: '.item-type',
    itemID: '.item-id'
  }
});

module.exports = {
  url: function () {
    return `${this.api.globals.clientUrl}/search/`;
  },

  elements: {
    queryInput: '.query-input',
    clearIcon: '.clear-icon',
    suggestedHeader: '#search-category-suggested',
    recentHeader: '#search-category-recent',
    dateCRsHeader: '#search-category-dateCRs',
    dateTRRsHeader: '#search-category-dateTRRs',
    crsHeader: '#search-category-crs',
    trrsHeader: '#search-category-trrs',
    officersHeader: '#search-category-officers',
  },

  sections: {
    suggested: {
      selector: '.results.suggested',
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
      selector: '.results.recent'
    },

    dateCRs: resultsSection('dateCRs'),
    dateTRRs: resultsSection('dateTRRs'),
    officers: {
      selector: '.results.officers',
      sections: {
        firstRow: {
          selector: 'a:nth-child(1)',
          elements: {
            officerName: '.officer-name',
            officerBadge: '.officer-badge'
          }
        }
      }
    },
    crs: resultsSection('crs'),
    trrs: resultsSection('trrs'),
  }
};
