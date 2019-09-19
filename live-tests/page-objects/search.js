const resultsSection = (name) => ({
  selector: `.results.${name}`,
  sections: {
    firstRow: nthRow(1),
    secondRow: nthRow(2),
    thirdRow: nthRow(3),
    rows: {
      selector: `.results.${name} div a`,
    },
  },
  elements: {
    allLink: '.all',
  },
});

const nthRow = (n) => ({
  selector: `a:nth-child(${n})`,
  elements: {
    itemType: '.item-type',
    itemID: '.item-id',
    officerName: '.officer-name',
    officerBadge: '.officer-badge',
  },
});

module.exports = {
  url: function (query = '') {
    let result = `${this.api.globals.clientUrl}/search/`;
    if (query)
      result = `${result}?terms=${query}`;
    return result;
  },

  elements: {
    body: 'body',
    queryInput: '.query-input',
    backToFullSearchLink: '.back-to-full-search-link',
    suggestedHeader: '#search-category-suggested',
    recentHeader: '#search-category-recent',
    dateCRsHeader: '#search-category-dateCRs',
    dateTRRsHeader: '#search-category-dateTRRs',
    dateOfficersHeader: '#search-category-dateOfficers',
    crsHeader: '#search-category-crs',
    investigatorCRsHeader: '#search-category-investigatorCRs',
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
            value: '.suggested-title',
          },
        },
      },
    },

    recent: {
      selector: '.results.recent',
    },

    dateCRs: resultsSection('dateCRs'),
    dateTRRs: resultsSection('dateTRRs'),
    dateOfficers: resultsSection('dateOfficers'),
    officers: {
      selector: '.results.officers',
      sections: {
        firstRow: {
          selector: 'a:nth-child(1)',
          elements: {
            officerName: '.officer-name',
            officerBadge: '.officer-badge',
          },
        },
        rows: {
          selector: '.results.officers div a',
        },
      },
      elements: {
        allLink: '.all',
      },
    },
    crs: resultsSection('crs'),
    investigatorCRs: resultsSection('investigatorCRs'),
    trrs: resultsSection('trrs'),
  },
};
