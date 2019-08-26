import constants from 'constants';

import {
  officersSelector,
  suggestedSelector,
  recentSelector,
  unitsSelector,
  crsSelector,
  trrsSelector,
  dateCRsSelector,
  dateTRRsSelector,
  dateOfficersSelector,
  investigatorCRsSelector,
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

      officersSelector(state).should.be.eql({ data: [] });
    });

    it('should return default values when the data is not available', function () {
      const state = {
        suggestionApp: {
          suggestions: {
            OFFICER: {
              isShowingAll: true,
              data: [
                {
                  'id': '1',
                  'name': 'Name',
                  'badge': null,
                  'percentile': null,
                },
              ],
            },
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      officersSelector(state).should.be.eql({
        isShowingAll: true,
        data: [{
          id: '1',
          name: 'Name',
          badge: '',
          percentile: null,
          url: `${constants.OFFICER_PATH}1/name/`,
          isPinned: false,
          type: 'OFFICER',
        }],
      });
    });

    it('should return officer data when there are officers', function () {
      const isShowingAll = true;
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
        url: `${constants.OFFICER_PATH}1/name/`,
        percentile: null,
        isPinned: true,
        type: 'OFFICER',
      };

      const state = {
        suggestionApp: {
          suggestions: {
            OFFICER: {
              isShowingAll: isShowingAll,
              data: [officer],
            },
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

      officersSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: [expectedOfficer],
      });
    });
  });

  describe('suggestedSelector', function () {
    it('should return correct value', function () {
      const state = {
        suggestionApp: {
          initialSuggestions: {
            suggested: 'foobar',
          },
        },
      };
      suggestedSelector(state).should.be.eql('foobar');
    });
  });

  describe('recentSelector', function () {
    it('should return correct value', function () {
      const state = {
        suggestionApp: {
          initialSuggestions: {
            recent: 'foobar',
          },
        },
      };
      recentSelector(state).should.be.eql('foobar');
    });
  });

  describe('unitsSelector', function () {
    it('should return empty when there are no units', function () {
      const state = {
        suggestionApp: {
          suggestions: {
          },
        },
      };

      unitsSelector(state).should.be.eql({ data: [] });
    });

    it('should return unit data when there are units', function () {
      const isShowingAll = true;
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
            UNIT: {
              isShowingAll: isShowingAll,
              data: units,
            },
          },
        },
      };

      unitsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedUnits,
      });
    });
  });

  describe('dateCRsSelector', function () {
    it('should return empty when there are no date > crs', function () {
      const state = {
        suggestionApp: {
          suggestions: {
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      dateCRsSelector(state).should.be.eql({ data: [] });
    });

    it('should return cr data when there are date > crs', function () {
      const isShowingAll = true;
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
          type: 'CR',
          isPinned: false,
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'DATE > CR': {
              isShowingAll: isShowingAll,
              data: dateCRs,
            },
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

      dateCRsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedDateCrs,
      });
    });
  });

  describe('dateTRRsSelector', function () {
    it('should return empty when there are no trss', function () {
      const state = {
        suggestionApp: {
          suggestions: {
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      dateTRRsSelector(state).should.be.eql({ data: [] });
    });

    it('should return trr data when there are trrs', function () {
      const isShowingAll = true;
      const dateTRRs = [
        {
          'id': '1',
        },
      ];
      const expectedDateTRRs = [
        {
          'id': '1',
          'url': '/trr/1/',
          'isPinned': false,
          'type': 'TRR',
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'DATE > TRR': {
              isShowingAll: isShowingAll,
              data: dateTRRs,
            },
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

      dateTRRsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedDateTRRs,
      });
    });
  });

  describe('crsSelector', function () {
    it('should return empty when there are no crs', function () {
      const state = {
        suggestionApp: {
          suggestions: {
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      crsSelector(state).should.be.eql({ data: [] });
    });

    it('should return cr data when there are crs', function () {
      const isShowingAll = true;
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
          type: 'CR',
          isPinned: false,
        },
        {
          crid: '1049273',
          url: '/complaint/1049273/',
          category: 'Domestic',
          incidentDate: '10/13/2011',
          type: 'CR',
          isPinned: true,
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            CR: {
              isShowingAll: isShowingAll,
              data: crs,
            },
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

      crsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedCrs,
      });
    });
  });

  describe('investigatorCRsSelector', function () {
    it('should return empty when there are no INVESTIGATOR > CR data', function () {
      const state = {
        suggestionApp: {
          suggestions: {
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      investigatorCRsSelector(state).should.be.eql({ data: [] });
    });

    it('should return INVESTIGATOR > CR data correctly', function () {
      const isShowingAll = true;
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
          type: 'CR',
          isPinned: false,
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'INVESTIGATOR > CR': {
              isShowingAll: isShowingAll,
              data: investigatorCR,
            },
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      investigatorCRsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedInvestigatorCR,
      });
    });
  });

  describe('trrsSelector', function () {
    it('should return empty when there are no trss', function () {
      const state = {
        suggestionApp: {
          suggestions: {
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      trrsSelector(state).should.be.eql({ data: [] });
    });

    it('should return trr data when there are trrs', function () {
      const isShowingAll = true;
      const trrs = [
        {
          'id': '1',
        },
      ];
      const expectedTrrs = [
        {
          'id': '1',
          'url': '/trr/1/',
          'isPinned': true,
          'type': 'TRR',
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            TRR: {
              isShowingAll: isShowingAll,
              data: trrs,
            },
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

      trrsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedTrrs,
      });
    });
  });

  describe('dateOfficersSelector', function () {
    it('should return empty when there is no DATE > OFFICERS', function () {
      const state = {
        suggestionApp: {
          suggestions: {
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      dateOfficersSelector(state).should.be.eql({ data: [] });
    });

    it('should return correct values for DATE > OFFICERS suggestion', function () {
      const state = {
        suggestionApp: {
          suggestions: {
            ['DATE > OFFICERS']: {
              isShowingAll: true,
              data: [
                {
                  'id': 123,
                  'name': 'Jerome Finnigan',
                  'badge': '56789',
                  'percentile': null,
                },
              ],
            },
          },
        },
        pinboardPage: {
          pinboard: null,
        },
      };

      dateOfficersSelector(state).should.be.eql({
        isShowingAll: true,
        data: [{
          id: 123,
          name: 'Jerome Finnigan',
          badge: 'Badge #56789',
          percentile: null,
          url: `${constants.OFFICER_PATH}123/jerome-finnigan/`,
          type: 'OFFICER',
          isPinned: false,
        }],
      });
    });
  });
});
