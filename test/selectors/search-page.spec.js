import constants from 'constants';

import {
  officersSelector,
  suggestedSelector,
  recentSelector,
  unitsSelector,
  crsSelector,
  trrsSelector,
  dateCRsSelector,
  dateTRRsSelector
} from 'selectors/search-page';

describe('search-page selectors', () => {
  describe('officersSelector', () => {
    it('should return empty when there is no officer', () => {
      const state = {
        suggestionApp: {
          suggestions: {
          }
        }
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
                  'id': 1,
                  'name': 'Name',
                  'badge': null,
                  'percentile': null
                }
              ]
            }
          }
        }
      };

      officersSelector(state).should.be.eql({
        isShowingAll: true,
        data: [{
          id: 1,
          name: 'Name',
          badge: '',
          percentile: null,
          url: `${constants.OFFICER_PATH}1/name/`,
        }]
      });
    });

    it('should return officer data when there are officers', () => {
      const isShowingAll = true;
      const officer = {
        'id': 1,
        'name': 'Name',
        'badge': '12314',
        'percentile': null
      };

      const expectedOfficer = {
        id: 1,
        name: 'Name',
        badge: 'Badge #12314',
        url: `${constants.OFFICER_PATH}1/name/`,
        percentile: null
      };

      const state = {
        suggestionApp: {
          suggestions: {
            OFFICER: {
              isShowingAll: isShowingAll,
              data: [officer]
            }
          }
        }
      };

      officersSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: [expectedOfficer]
      });
    });
  });

  describe('suggestedSelector', () => {
    it('should return correct value', () => {
      const state = {
        suggestionApp: {
          initialSuggestions: {
            suggested: 'foobar'
          }
        }
      };
      suggestedSelector(state).should.be.eql('foobar');
    });
  });

  describe('recentSelector', () => {
    it('should return correct value', () => {
      const state = {
        suggestionApp: {
          initialSuggestions: {
            recent: 'foobar'
          }
        }
      };
      recentSelector(state).should.be.eql('foobar');
    });
  });

  describe('unitsSelector', () => {
    it('should return empty when there are no units', () => {
      const state = {
        suggestionApp: {
          suggestions: {
          }
        }
      };

      unitsSelector(state).should.be.eql({ data: [] });
    });

    it('should return unit data when there are units', () => {
      const isShowingAll = true;
      const units = [
        {
          'id': '1',
          'text': '001',
          'member_count': 2,
          'active_member_count': 1,
          'url': 'http://example.unit/1'
        },
        {
          'id': '2',
          'text': '002',
          'member_count': 4,
          'active_member_count': 3,
          'url': 'http://example.unit/2'
        }
      ];
      const expectedUnits = [
        {
          'id': '1',
          'text': '001',
          'memberCount': 2,
          'activeMemberCount': 1,
          'url': 'http://example.unit/1'
        },
        {
          'id': '2',
          'text': '002',
          'memberCount': 4,
          'activeMemberCount': 3,
          'url': 'http://example.unit/2'
        }
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            UNIT: {
              isShowingAll: isShowingAll,
              data: units
            }
          }
        }
      };

      unitsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedUnits
      });
    });
  });

  describe('dateCRsSelector', () => {
    it('should return empty when there are no date > crs', () => {
      const state = {
        suggestionApp: {
          suggestions: {
          }
        }
      };

      dateCRsSelector(state).should.be.eql({ data: [] });
    });

    it('should return cr data when there are date > crs', () => {
      const isShowingAll = true;
      const dateCRs = [
        {
          'crid': '1'
        },
      ];
      const expectedDateCrs = [
        {
          'crid': '1',
          'url': '/complaint/1/'
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'DATE > CR': {
              isShowingAll: isShowingAll,
              data: dateCRs
            }
          }
        }
      };

      dateCRsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedDateCrs
      });
    });
  });

  describe('dateTRRsSelector', () => {
    it('should return empty when there are no trss', () => {
      const state = {
        suggestionApp: {
          suggestions: {
          }
        }
      };

      dateTRRsSelector(state).should.be.eql({ data: [] });
    });

    it('should return trr data when there are trrs', () => {
      const isShowingAll = true;
      const dateTRRs = [
        {
          'id': '1'
        },
      ];
      const expectedDateTRRs = [
        {
          'id': '1',
          'url': '/trr/1/'
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            'DATE > TRR': {
              isShowingAll: isShowingAll,
              data: dateTRRs
            }
          }
        }
      };

      dateTRRsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedDateTRRs
      });
    });
  });

  describe('crsSelector', () => {
    it('should return empty when there are no crs', () => {
      const state = {
        suggestionApp: {
          suggestions: {
          }
        }
      };

      crsSelector(state).should.be.eql({ data: [] });
    });

    it('should return cr data when there are crs', () => {
      const isShowingAll = true;
      const crs = [
        {
          'crid': '1'
        },
      ];
      const expectedCrs = [
        {
          'crid': '1',
          'url': '/complaint/1/'
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            CR: {
              isShowingAll: isShowingAll,
              data: crs
            }
          }
        }
      };

      crsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedCrs
      });
    });
  });

  describe('trrsSelector', () => {
    it('should return empty when there are no trss', () => {
      const state = {
        suggestionApp: {
          suggestions: {
          }
        }
      };

      trrsSelector(state).should.be.eql({ data: [] });
    });

    it('should return trr data when there are trrs', () => {
      const isShowingAll = true;
      const trrs = [
        {
          'id': '1'
        },
      ];
      const expectedTrrs = [
        {
          'id': '1',
          'url': '/trr/1/'
        },
      ];

      const state = {
        suggestionApp: {
          suggestions: {
            TRR: {
              isShowingAll: isShowingAll,
              data: trrs
            }
          }
        }
      };

      trrsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: expectedTrrs
      });
    });
  });
});
