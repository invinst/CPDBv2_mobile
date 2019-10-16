import constants from 'constants';

import {
  officersSelector,
  getRecentSuggestions,
  unitsSelector,
  crsSelector,
  trrsSelector,
  dateCRsSelector,
  dateTRRsSelector,
  dateOfficersSelector,
  investigatorCRsSelector,
  getChosenCategory,
  getActiveCategory,
  getQuery,
  queryPrefixSelector,
} from 'selectors/search-page';

describe('search-page selectors', function () {
  describe('officersSelector', function () {
    it('should return empty when there is no officer', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
      };

      officersSelector(state).should.be.eql([]);
    });

    it('should return default values when the data is not available', function () {
      const state = {
        suggestionApp: {
          suggestions: {
            OFFICER: [
              {
                'id': 1,
                'name': 'Name',
                'badge': null,
                'percentile': null,
              },
            ],
          },
        },
      };

      officersSelector(state).should.be.eql([
        {
          id: 1,
          name: 'Name',
          badge: '',
          percentile: null,
          url: `${constants.OFFICER_PATH}1/name/`,
        },
      ]);
    });

    it('should return officer data when there are officers', function () {
      const officer = {
        'id': 1,
        'name': 'Name',
        'badge': '12314',
        'percentile': null,
      };

      const expectedOfficer = {
        id: 1,
        name: 'Name',
        badge: 'Badge #12314',
        url: `${constants.OFFICER_PATH}1/name/`,
        percentile: null,
      };

      const state = {
        suggestionApp: {
          suggestions: {
            OFFICER: [officer],
          },
        },
      };

      officersSelector(state).should.be.eql([expectedOfficer]);
    });
  });

  describe('getRecentSuggestions', function () {
    it('should return correct value', function () {
      const state = {
        suggestionApp: {
          recentSuggestions: ['item1', 'item2'],
        },
      };
      getRecentSuggestions(state).should.be.eql(['item1', 'item2']);
    });
  });

  describe('unitsSelector', function () {
    it('should return empty when there are no units', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
      };

      unitsSelector(state).should.be.eql([]);
    });

    it('should return unit data when there are units', function () {
      const units = [
        {
          'id': '1',
          'text': '001',
          'member_count': 2,
          'active_member_count': 1,
          'url': 'http://example.unit/1',
        },
        {
          'id': '2',
          'text': '002',
          'member_count': 4,
          'active_member_count': 3,
          'url': 'http://example.unit/2',
        },
      ];
      const expectedUnits = [
        {
          'id': '1',
          'text': '001',
          'memberCount': 2,
          'activeMemberCount': 1,
          'url': 'http://example.unit/1',
        },
        {
          'id': '2',
          'text': '002',
          'memberCount': 4,
          'activeMemberCount': 3,
          'url': 'http://example.unit/2',
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            UNIT: units,
          },
        },
      };

      unitsSelector(state).should.be.eql(expectedUnits);
    });
  });

  describe('dateCRsSelector', function () {
    it('should return empty when there are no date > crs', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
      };

      dateCRsSelector(state).should.be.eql([]);
    });

    it('should return cr data when there are date > crs', function () {
      const dateCRs = [
        {
          category: 'Use Of Force',
          crid: '1027271',
          highlight: {
            summary: ['On July', 'an off-duty'],
          },
          id: '1027271',
          'incident_date': '2009-06-13',
        },
      ];
      const expectedDateCrs = [
        {
          crid: '1027271',
          url: '/complaint/1027271/',
          incidentDate: '06/13/2009',
          category: 'Use Of Force',
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'DATE > CR': dateCRs,
          },
        },
      };

      dateCRsSelector(state).should.be.eql(expectedDateCrs);
    });
  });

  describe('dateTRRsSelector', function () {
    it('should return empty when there are no trss', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
      };

      dateTRRsSelector(state).should.be.eql([]);
    });

    it('should return trr data when there are trrs', function () {
      const dateTRRs = [
        {
          'id': '1',
        },
      ];
      const expectedDateTRRs = [
        {
          'id': '1',
          'url': '/trr/1/',
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'DATE > TRR': dateTRRs,
          },
        },
      };

      dateTRRsSelector(state).should.be.eql(expectedDateTRRs);
    });
  });

  describe('crsSelector', function () {
    it('should return empty when there are no crs', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
      };

      crsSelector(state).should.be.eql([]);
    });

    it('should return cr data when there are crs', function () {
      const crs = [
        {
          category: 'Use Of Force',
          crid: '1027271',
          highlight: {
            summary: ['On July', 'an off-duty'],
          },
          id: '1027271',
          'incident_date': '2009-06-13',
        },
        {
          category: 'Domestic',
          crid: '1049273',
          highlight: {
            summary: ['On October', 'regarding an incident that occurred'],
          },
          id: '1049273',
          'incident_date': '2011-10-13',
        },
      ];
      const expectedCrs = [
        {
          crid: '1027271',
          url: '/complaint/1027271/',
          category: 'Use Of Force',
          incidentDate: '06/13/2009',
        },
        {
          crid: '1049273',
          url: '/complaint/1049273/',
          category: 'Domestic',
          incidentDate: '10/13/2011',
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            CR: crs,
          },
        },
      };

      crsSelector(state).should.be.eql(expectedCrs);
    });
  });

  describe('investigatorCRsSelector', function () {
    it('should return empty when there are no INVESTIGATOR > CR data', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
      };

      investigatorCRsSelector(state).should.be.eql([]);
    });

    it('should return INVESTIGATOR > CR data correctly', function () {
      const investigatorCR = [
        {
          category: 'Use Of Force',
          crid: '1027271',
          highlight: {
            summary: ['On July', 'an off-duty'],
          },
          id: '1027271',
          'incident_date': '2009-06-13',
        },
      ];
      const expectedInvestigatorCR = [
        {
          crid: '1027271',
          url: '/complaint/1027271/',
          incidentDate: '06/13/2009',
          category: 'Use Of Force',
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'INVESTIGATOR > CR': investigatorCR,
          },
        },
      };

      investigatorCRsSelector(state).should.be.eql(expectedInvestigatorCR);
    });
  });

  describe('trrsSelector', function () {
    it('should return empty when there are no trss', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
      };

      trrsSelector(state).should.be.eql([]);
    });

    it('should return trr data when there are trrs', function () {
      const trrs = [
        {
          'id': '1',
        },
      ];
      const expectedTrrs = [
        {
          'id': '1',
          'url': '/trr/1/',
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            TRR: trrs,
          },
        },
      };

      trrsSelector(state).should.be.eql(expectedTrrs);
    });
  });

  describe('dateOfficersSelector', function () {
    it('should return empty when there is no DATE > OFFICERS', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
      };

      dateOfficersSelector(state).should.be.eql([]);
    });

    it('should return correct values for DATE > OFFICERS suggestion', function () {
      const state = {
        suggestionApp: {
          suggestions: {
            ['DATE > OFFICERS']: [
              {
                'id': 123,
                'name': 'Jerome Finnigan',
                'badge': '56789',
                'percentile': null,
              },
            ],
          },
        },
      };

      dateOfficersSelector(state).should.be.eql([
        {
          id: 123,
          name: 'Jerome Finnigan',
          badge: 'Badge #56789',
          percentile: null,
          url: `${constants.OFFICER_PATH}123/jerome-finnigan/`,
        },
      ]);
    });
  });

  describe('getChosenCategory', function () {
    it('should return correct chosen category', function () {
      const state = {
        suggestionApp: {
          chosenCategory: 'dateOfficers',
        },
      };
      getChosenCategory(state).should.be.eql('dateOfficers');
    });
  });

  describe('getActiveCategory', function () {
    it('should return correct active category', function () {
      const state = {
        suggestionApp: {
          activeCategory: 'dateOfficers',
        },
      };
      getActiveCategory(state).should.be.eql('dateOfficers');
    });
  });

  describe('getQuery', function () {
    it('should return query', function () {
      const state = {
        suggestionApp: {
          query: 'jerome',
        },
      };
      getQuery(state).should.be.eql('jerome');
    });
  });

  describe('queryPrefixSelector', function () {
    it('should return correct query prefix', function () {
      const state = {
        suggestionApp: {
          chosenCategory: 'dateOfficers',
        },
      };
      queryPrefixSelector(state).should.be.eql('date-officer');
    });
  });
});
