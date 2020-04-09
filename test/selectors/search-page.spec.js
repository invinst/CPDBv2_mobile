import { OFFICER_PATH } from 'constants/paths';
import {
  officersSelector,
  unitsSelector,
  crsSelector,
  trrsSelector,
  dateCRsSelector,
  dateTRRsSelector,
  dateOfficersSelector,
  investigatorCRsSelector,
  recentSuggestionsSelector,
  recentSuggestionIdsSelector,
  getChosenCategory,
  getActiveCategory,
  getQuery,
  queryPrefixSelector,
  isShowingSingleContentTypeSelector,
  hasMoreSelector,
  nextParamsSelector,
  getCancelPathname,
  categoriesSelector,
} from 'selectors/search-page';


describe('search-page selectors', function () {
  describe('officersSelector', function () {
    it('should return empty when there is no officer', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      officersSelector(state).should.be.eql([]);
    });

    it('should return default values when the data is not available', function () {
      const officer = {
        'id': '1',
        'name': 'Name',
        'badge': null,
        'percentile': null,
      };
      const state = {
        suggestionApp: {
          suggestions: {
            OFFICER: [officer],
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      officersSelector(state).should.be.eql([
        {
          id: '1',
          name: 'Name',
          badge: '',
          percentile: null,
          url: `${OFFICER_PATH}1/name/`,
          isPinned: false,
          type: 'OFFICER',
          recentItemData: officer,
        },
      ]);
    });

    it('should return officer data when there are officers', function () {
      const officer = {
        'id': '1',
        'name': 'Name',
        'badge': '12314',
        'percentile': null,
      };

      const expectedOfficer = {
        id: '1',
        name: 'Name',
        badge: 'Badge #12314',
        url: `${OFFICER_PATH}1/name/`,
        percentile: null,
        isPinned: true,
        type: 'OFFICER',
        recentItemData: officer,
      };

      const state = {
        suggestionApp: {
          suggestions: {
            OFFICER: [officer],
          },
        },
        pinboardPage: {
          pinboard: {
            id: 99,
            'officer_ids': [1],
            crids: [],
            'trr_ids': [],
          },
        },
      };

      officersSelector(state).should.be.eql([expectedOfficer]);
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
        pinboardPage: {
          pinboard: null,
        },
      };

      dateCRsSelector(state).should.be.eql([]);
    });

    it('should return cr data when there are date > crs', function () {
      const dateCR = {
        category: 'Use Of Force',
        crid: '1027271',
        highlight: {
          summary: ['On July', 'an off-duty'],
        },
        id: '1027271',
        'incident_date': '2009-06-13',
      };
      const expectedDateCrs = [
        {
          crid: '1027271',
          id: '1027271',
          url: '/complaint/1027271/',
          incidentDate: '06/13/2009',
          category: 'Use Of Force',
          type: 'CR',
          isPinned: false,
          recentItemData: dateCR,
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'DATE > CR': [dateCR],
          },
        },
        pinboardPage: {
          pinboard: {
            id: 99,
            'officer_ids': [],
            crids: ['1027272'],
            'trr_ids': [],
          },
        },
      };

      dateCRsSelector(state).should.be.eql(expectedDateCrs);
    });
  });

  describe('dateTRRsSelector', function () {
    it('should return empty when there are no trrs', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      dateTRRsSelector(state).should.be.eql([]);
    });

    it('should return trr data when there are trrs', function () {
      const dateTRR = {
        'id': '1',
      };
      const expectedDateTRRs = [
        {
          id: '1',
          url: '/trr/1/',
          isPinned: false,
          type: 'TRR',
          recentItemData: dateTRR,
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'DATE > TRR': [dateTRR],
          },
        },
        pinboardPage: {
          pinboard: {
            'officer_ids': [],
            crids: [],
            'trr_ids': ['2'],
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
        pinboardPage: {
          pinboard: null,
        },
      };

      crsSelector(state).should.be.eql([]);
    });

    it('should return cr data when there are crs', function () {
      const cr1 = {
        category: 'Use Of Force',
        crid: '1027271',
        highlight: {
          summary: ['On July', 'an off-duty'],
        },
        id: '1027271',
        'incident_date': '2009-06-13',
      };
      const cr2 = {
        category: 'Domestic',
        crid: '1049273',
        highlight: {
          summary: ['On October', 'regarding an incident that occurred'],
        },
        id: '1049273',
        'incident_date': '2011-10-13',
      };
      const expectedCrs = [
        {
          crid: '1027271',
          id: '1027271',
          url: '/complaint/1027271/',
          category: 'Use Of Force',
          incidentDate: '06/13/2009',
          type: 'CR',
          isPinned: false,
          recentItemData: cr1,
        },
        {
          crid: '1049273',
          id: '1049273',
          url: '/complaint/1049273/',
          category: 'Domestic',
          incidentDate: '10/13/2011',
          type: 'CR',
          isPinned: true,
          recentItemData: cr2,
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            CR: [cr1, cr2],
          },
        },
        pinboardPage: {
          pinboard: {
            id: 99,
            'officer_ids': [1],
            crids: ['1049273'],
            'trr_ids': [1],
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
        pinboardPage: {
          pinboard: null,
        },
      };

      investigatorCRsSelector(state).should.be.eql([]);
    });

    it('should return INVESTIGATOR > CR data correctly', function () {
      const investigatorCR = {
        category: 'Use Of Force',
        crid: '1027271',
        highlight: {
          summary: ['On July', 'an off-duty'],
        },
        id: '1027271',
        'incident_date': '2009-06-13',
      };
      const expectedInvestigatorCR = [
        {
          crid: '1027271',
          id: '1027271',
          url: '/complaint/1027271/',
          incidentDate: '06/13/2009',
          category: 'Use Of Force',
          type: 'CR',
          isPinned: false,
          recentItemData: investigatorCR,
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'INVESTIGATOR > CR': [investigatorCR],
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      investigatorCRsSelector(state).should.be.eql(expectedInvestigatorCR);
    });
  });

  describe('trrsSelector', function () {
    it('should return empty when there are no trrs', function () {
      const state = {
        suggestionApp: {
          suggestions: {},
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      trrsSelector(state).should.be.eql([]);
    });

    it('should return trr data when there are trrs', function () {
      const trr = {
        'id': '1',
      };
      const expectedTrrs = [
        {
          id: '1',
          url: '/trr/1/',
          isPinned: true,
          type: 'TRR',
          recentItemData: trr,
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            TRR: [trr],
          },
        },
        pinboardPage: {
          pinboard: {
            'officer_ids': [],
            crids: [],
            'trr_ids': ['1'],
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
        pinboardPage: {
          pinboard: null,
        },
      };

      dateOfficersSelector(state).should.be.eql([]);
    });

    it('should return correct values for DATE > OFFICERS suggestion', function () {
      const officer = {
        'id': 123,
        'name': 'Jerome Finnigan',
        'badge': '56789',
        'percentile': null,
      };
      const state = {
        suggestionApp: {
          suggestions: {
            'DATE > OFFICERS': [officer],
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      dateOfficersSelector(state).should.be.eql([
        {
          id: 123,
          name: 'Jerome Finnigan',
          badge: 'Badge #56789',
          percentile: null,
          url: `${OFFICER_PATH}123/jerome-finnigan/`,
          type: 'OFFICER',
          isPinned: false,
          recentItemData: officer,
        },
      ]);
    });
  });

  describe('recentSuggestionsSelector', function () {
    it('should return recent suggestions data correctly', function () {
      const state = {
        pinboardPage: {
          pinboard: {
            'officer_ids': [8562],
            crids: ['317'],
            'trr_ids': [123456],
          },
        },
        suggestionApp: {
          recentSuggestions: [
            {
              type: 'OFFICER',
              id: 8562,
              data: {
                id: 8562,
                name: 'Jerome Finnigan',
                badge: '123456',
                type: 'OFFICER',
              },
            },
            {
              type: 'CR',
              id: '271235',
              data: {
                id: '271235',
                crid: '271235',
                'incident_date': '2001-02-10',
                category: 'Use Of Force',
                type: 'CR',
              },
            },
            {
              type: 'TRR',
              id: 123456,
              data: {
                type: 'TRR',
                id: 123456,
              },
            },
          ],
        },
      };

      recentSuggestionsSelector(state).should.be.eql([
        {
          id: 8562,
          name: 'Jerome Finnigan',
          badge: 'Badge #123456',
          percentile: null,
          url: '/officer/8562/jerome-finnigan/',
          isPinned: true,
          type: 'OFFICER',
          recentItemData: {
            id: 8562,
            name: 'Jerome Finnigan',
            badge: '123456',
            type: 'OFFICER',
          },
        },
        {
          crid: '271235',
          id: '271235',
          url: '/complaint/271235/',
          incidentDate: '02/10/2001',
          isPinned: false,
          category: 'Use Of Force',
          type: 'CR',
          recentItemData: {
            id: '271235',
            crid: '271235',
            'incident_date': '2001-02-10',
            category: 'Use Of Force',
            type: 'CR',
          },
        },
        {
          id: 123456,
          url: '/trr/123456/',
          isPinned: true,
          type: 'TRR',
          recentItemData: {
            type: 'TRR',
            id: 123456,
          },
        },
      ]);
    });
  });

  describe('recentSuggestionIdsSelector', function () {
    it('should return correct recent suggestion ids', function () {
      const state = {
        suggestionApp: {
          recentSuggestions: [
            { type: 'OFFICER', id: 8562, data: {} },
            { type: 'CR', id: '271235', data: {} },
            { type: 'TRR', id: 123, data: {} },
          ],
        },
      };

      recentSuggestionIdsSelector(state).should.eql({
        officerIds: [8562],
        crids: ['271235'],
        trrIds: [123],
      });
    });

    it('should exclude invalid ids', function () {
      const state = {
        suggestionApp: {
          recentSuggestions: [
            { type: 'OFFICER', id: 8562, data: {} },
            { type: 'CR', data: {} },
            { type: 'TRR', id: 123, data: {} },
          ],
        },
      };

      recentSuggestionIdsSelector(state).should.eql({
        officerIds: [8562],
        trrIds: [123],
      });
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

  describe('isShowingSingleContentTypeSelector', function () {
    it('should tell if showing single type of content', function () {
      isShowingSingleContentTypeSelector({
        suggestionApp: {
          chosenCategory: 'OFFICER',
        },
      }).should.be.true();

      isShowingSingleContentTypeSelector({
        suggestionApp: {
          chosenCategory: null,
        },
      }).should.be.false();

      isShowingSingleContentTypeSelector({
        suggestionApp: {},
      }).should.be.false();
    });
  });

  describe('hasMoreSelector', function () {
    it('should return false when no content type is selected', function () {
      hasMoreSelector({
        suggestionApp: {
          tags: [],
          pagination: {},
          contentType: null,
        },
      }).should.be.false();
    });

    it('should return false when content type is selected and there is no next url', function () {
      hasMoreSelector({
        suggestionApp: {
          tags: [],
          pagination: {},
          contentType: 'OFFICER',
        },
      }).should.be.false();
    });
  });

  describe('nextParamsSelector', function () {
    it('should return params from url', function () {
      nextParamsSelector({
        suggestionApp: {
          pagination: {
            next: 'example.com?limit=20&offset=20',
          },
        },
      }).should.deepEqual({
        limit: '20',
        offset: '20',
      });
    });
  });

  describe('categoriesSelector', function () {
    it('should return RECENT if query is short', function () {
      categoriesSelector({
        pinboardPage: {
          pinboard: {
            'officer_ids': [8562],
            crids: ['317'],
            'trr_ids': [123456],
          },
        },
        suggestionApp: {
          query: 'K',
          recentSuggestions: [
            {
              type: 'OFFICER',
              id: 8562,
              data: {
                id: 8562,
                name: 'Jerome Finnigan',
                badge: '123456',
                type: 'OFFICER',
              },
            },
            {
              type: 'CR',
              id: '271235',
              data: {
                id: '271235',
                crid: '271235',
                'incident_date': '2001-02-10',
                category: 'Use Of Force',
                type: 'CR',
              },
            },
            {
              type: 'TRR',
              id: 123456,
              data: {
                type: 'TRR',
                id: 123456,
              },
            },
          ],
          suggestions: {
            CR: [
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
            ],
          },
        },
      }).should.be.eql([{
        name: 'RECENT',
        id: 'recent',
        items: [
          {
            badge: 'Badge #123456',
            id: 8562,
            isPinned: true,
            itemRank: 1,
            name: 'Jerome Finnigan',
            percentile: null,
            recentItemData: {
              badge: '123456',
              id: 8562,
              name: 'Jerome Finnigan',
              type: 'OFFICER',
            },
            showIntroduction: true,
            type: 'OFFICER',
            url: '/officer/8562/jerome-finnigan/',
          },
          {
            category: 'Use Of Force',
            crid: '271235',
            id: '271235',
            incidentDate: '02/10/2001',
            isPinned: false,
            itemRank: 2,
            recentItemData: {
              category: 'Use Of Force',
              crid: '271235',
              id: '271235',
              'incident_date': '2001-02-10',
              type: 'CR',
            },
            showIntroduction: false,
            type: 'CR',
            url: '/complaint/271235/',
          },
          {
            id: 123456,
            isPinned: true,
            itemRank: 3,
            recentItemData: { id: 123456, type: 'TRR' },
            showIntroduction: false,
            type: 'TRR',
            url: '/trr/123456/',
          },
        ],
        showAllButton: false,
      }]);
    });

    it('should return chosen category if query is long enough and chosenCategory is not null', function () {
      const cr1 = {
        category: 'Use Of Force',
        crid: '1027271',
        highlight: {
          summary: ['On July', 'an off-duty'],
        },
        id: '1027271',
        'incident_date': '2009-06-13',
      };
      const cr2 = {
        category: 'Domestic',
        crid: '1049273',
        highlight: {
          summary: ['On October', 'regarding an incident that occurred'],
        },
        id: '1049273',
        'incident_date': '2011-10-13',
      };
      categoriesSelector({
        pinboardPage: {
          pinboard: {
            id: 99,
            'officer_ids': [1],
            crids: ['1049273'],
            'trr_ids': [1],
          },
        },
        suggestionApp: {
          query: 'Ke',
          chosenCategory: 'crs',
          recentSuggestions: [
            {
              type: 'OFFICER',
              id: 8562,
              data: {
                id: 8562,
                name: 'Jerome Finnigan',
                badge: '123456',
                type: 'OFFICER',
              },
            },
            {
              type: 'CR',
              id: '271235',
              data: {
                id: '271235',
                crid: '271235',
                'incident_date': '2001-02-10',
                category: 'Use Of Force',
                type: 'CR',
              },
            },
            {
              type: 'TRR',
              id: 123456,
              data: {
                type: 'TRR',
                id: 123456,
              },
            },
          ],
          suggestions: {
            CR: [cr1, cr2],
          },
        },
      }).should.be.eql([{
        name: 'COMPLAINT RECORDS (CRs)',
        filter: 'CR',
        id: 'crs',
        path: 'CR',
        queryPrefix: 'cr',
        showAllButton: false,
        items: [
          {
            crid: '1027271',
            id: '1027271',
            itemRank: 1,
            url: '/complaint/1027271/',
            category: 'Use Of Force',
            incidentDate: '06/13/2009',
            type: 'CR',
            isPinned: false,
            showIntroduction: true,
            recentItemData: cr1,
          },
          {
            crid: '1049273',
            id: '1049273',
            itemRank: 2,
            url: '/complaint/1049273/',
            category: 'Domestic',
            incidentDate: '10/13/2011',
            type: 'CR',
            isPinned: true,
            showIntroduction: false,
            recentItemData: cr2,
          },
        ],
      }]);
    });

    it('should return categories with max 5 items if query is long enough and chosenCategory is null', function () {
      const cr1 = {
        category: 'Use Of Force',
        crid: '1027271',
        highlight: {
          summary: ['On July', 'an off-duty'],
        },
        id: '1027271',
        'incident_date': '2009-06-13',
      };
      const cr2 = {
        category: 'Domestic',
        crid: '1049273',
        highlight: {
          summary: ['On October', 'regarding an incident that occurred'],
        },
        id: '1049273',
        'incident_date': '2011-10-13',
      };
      const officer = {
        id: '1',
        'name': 'Name',
        'badge': '12314',
        'percentile': null,
      };
      const dateCR = {
        category: 'Use Of Force',
        crid: '1027271',
        highlight: {
          summary: ['On July', 'an off-duty'],
        },
        id: '1027271',
        'incident_date': '2009-06-13',
      };
      const dateTRR = {
        id: '1',
      };
      const dateOfficer = {
        id: 123,
        'name': 'Jerome Finnigan',
        'badge': '56789',
        'percentile': null,
      };
      const trr = {
        id: '1',
      };
      const investigatorCR = {
        category: 'Use Of Force',
        crid: '1027271',
        highlight: {
          summary: ['On July', 'an off-duty'],
        },
        id: '1027271',
        'incident_date': '2009-06-13',
      };
      categoriesSelector({
        pinboardPage: {
          pinboard: {
            id: 99,
            'officer_ids': [1],
            crids: ['1049273'],
            'trr_ids': [1],
          },
        },
        suggestionApp: {
          query: 'Ke',
          chosenCategory: '',
          recentSuggestions: [
            {
              type: 'OFFICER',
              id: 8562,
              data: {
                id: 8562,
                name: 'Jerome Finnigan',
                badge: '123456',
                type: 'OFFICER',
              },
            },
            {
              type: 'CR',
              id: '271235',
              data: {
                id: '271235',
                crid: '271235',
                'incident_date': '2001-02-10',
                category: 'Use Of Force',
                type: 'CR',
              },
            },
            {
              type: 'TRR',
              id: 123456,
              data: {
                type: 'TRR',
                id: 123456,
              },
            },
          ],
          suggestions: {
            CR: [cr1, cr2, cr1, cr2, cr1, cr2],
            OFFICER: [officer],
            'DATE > CR': [dateCR],
            'DATE > TRR': [dateTRR],
            'DATE > OFFICERS': [dateOfficer],
            TRR: [trr],
            'INVESTIGATOR > CR': [investigatorCR],
          },
        },
      }).should.be.eql([{
        name: 'DATE → COMPLAINT RECORDS',
        filter: 'DATE > CR',
        id: 'dateCRs',
        path: 'DATE > CR',
        queryPrefix: 'date-cr',
        showAllButton: true,
        items: [{
          crid: '1027271',
          id: '1027271',
          itemRank: 1,
          url: '/complaint/1027271/',
          incidentDate: '06/13/2009',
          category: 'Use Of Force',
          type: 'CR',
          isPinned: false,
          showIntroduction: true,
          recentItemData: dateCR,
        }],
      }, {
        name: 'DATE → TACTICAL RESPONSE REPORTS',
        filter: 'DATE > TRR',
        id: 'dateTRRs',
        path: 'DATE > TRR',
        queryPrefix: 'date-trr',
        showAllButton: true,
        items: [{
          id: '1',
          itemRank: 2,
          url: '/trr/1/',
          isPinned: true,
          showIntroduction: false,
          type: 'TRR',
          recentItemData: dateTRR,
        }],
      }, {
        name: 'DATE → OFFICERS',
        filter: 'DATE > OFFICERS',
        id: 'dateOfficers',
        path: 'DATE > OFFICERS',
        queryPrefix: 'date-officer',
        showAllButton: true,
        items: [{
          id: 123,
          itemRank: 3,
          name: 'Jerome Finnigan',
          badge: 'Badge #56789',
          percentile: null,
          url: `${ OFFICER_PATH }123/jerome-finnigan/`,
          type: 'OFFICER',
          isPinned: false,
          showIntroduction: false,
          recentItemData: dateOfficer,
        }],
      }, {
        name: 'OFFICERS',
        filter: 'Officers',
        id: 'officers',
        path: 'OFFICER',
        queryPrefix: 'officer',
        showAllButton: true,
        items: [{
          id: '1',
          itemRank: 4,
          name: 'Name',
          badge: 'Badge #12314',
          url: `${ OFFICER_PATH }1/name/`,
          percentile: null,
          isPinned: true,
          showIntroduction: false,
          type: 'OFFICER',
          recentItemData: officer,
        }],
      }, {
        name: 'COMPLAINT RECORDS (CRs)',
        filter: 'CR',
        id: 'crs',
        path: 'CR',
        queryPrefix: 'cr',
        showAllButton: true,
        items: [
          {
            crid: '1027271',
            id: '1027271',
            itemRank: 5,
            url: '/complaint/1027271/',
            category: 'Use Of Force',
            incidentDate: '06/13/2009',
            type: 'CR',
            isPinned: false,
            showIntroduction: false,
            recentItemData: cr1,
          },
          {
            crid: '1049273',
            id: '1049273',
            itemRank: 6,
            url: '/complaint/1049273/',
            category: 'Domestic',
            incidentDate: '10/13/2011',
            type: 'CR',
            isPinned: true,
            showIntroduction: false,
            recentItemData: cr2,
          },
          {
            crid: '1027271',
            id: '1027271',
            itemRank: 7,
            url: '/complaint/1027271/',
            category: 'Use Of Force',
            incidentDate: '06/13/2009',
            type: 'CR',
            isPinned: false,
            showIntroduction: false,
            recentItemData: cr1,
          },
          {
            crid: '1049273',
            id: '1049273',
            itemRank: 8,
            url: '/complaint/1049273/',
            category: 'Domestic',
            incidentDate: '10/13/2011',
            type: 'CR',
            isPinned: true,
            showIntroduction: false,
            recentItemData: cr2,
          },
          {
            crid: '1027271',
            id: '1027271',
            itemRank: 9,
            url: '/complaint/1027271/',
            category: 'Use Of Force',
            incidentDate: '06/13/2009',
            type: 'CR',
            isPinned: false,
            showIntroduction: false,
            recentItemData: cr1,
          },
        ],
      }, {
        name: 'TACTICAL RESPONSE REPORTS',
        filter: 'TRR',
        id: 'trrs',
        path: 'TRR',
        queryPrefix: 'trr',
        showAllButton: true,
        items: [{
          id: '1',
          itemRank: 10,
          url: '/trr/1/',
          isPinned: true,
          showIntroduction: false,
          type: 'TRR',
          recentItemData: trr,
        }],
      }, {
        name: 'INVESTIGATOR → CR',
        filter: 'INVESTIGATOR > CR',
        id: 'investigatorCRs',
        path: 'INVESTIGATOR > CR',
        queryPrefix: 'investigator-cr',
        showAllButton: true,
        items: [{
          crid: '1027271',
          id: '1027271',
          itemRank: 11,
          url: '/complaint/1027271/',
          incidentDate: '06/13/2009',
          category: 'Use Of Force',
          type: 'CR',
          isPinned: false,
          showIntroduction: false,
          recentItemData: investigatorCR,
        }],
      }]);
    });
  });

  describe('getCancelPathname', function () {
    it('should return the return path for the cancel button', function () {
      const state = {
        suggestionApp: {
          cancelPathname: '/pinboard/abc123/',
        },
      };
      getCancelPathname(state).should.equal('/pinboard/abc123/');
    });
  });
});
