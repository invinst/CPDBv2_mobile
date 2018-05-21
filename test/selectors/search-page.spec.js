import constants from 'constants';

import {
  officersSelector,
  suggestedSelector,
  recentSelector,
  unitsSelector,
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

    it('should return officer data when there are officers', () => {
      const isShowingAll = true;
      const officer = {
        'id': 1,
        'name': 'Name',
        'extra_info': 'Extra',
        'url': 'url'
      };
      const expectedOfficer = {
        id: 1,
        name: 'Name',
        extraInfo: 'Extra',
        url: `${constants.OFFICER_PATH}1/`
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

});
