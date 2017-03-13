import constants from 'constants';

import {
  officersSelector,
  faqsSelector,
  reportsSelector,
  suggestedSelector,
  recentSelector
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
        url: `${constants.OFFICER_PATH}/1/summary`
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

  describe('faqsSelector', () => {
    it('should return empty when there is no faq', () => {
      const state = {
        suggestionApp: {
          suggestions: {
          }
        }
      };

      faqsSelector(state).should.be.eql({ data: [] });
    });

    it('should return officer data when there are faqs', () => {
      const isShowingAll = true;
      const data = [{
        'any': 'any'
      }];

      const state = {
        suggestionApp: {
          suggestions: {
            FAQ: {
              isShowingAll: isShowingAll,
              data: data
            }
          }
        }
      };

      faqsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: data
      });
    });
  });

  describe('reportsSelector', () => {
    it('should return empty when there is no report', () => {
      const state = {
        suggestionApp: {
          suggestions: {
          }
        }
      };

      reportsSelector(state).should.be.eql({ data: [] });
    });

    it('should return officer data when there are reports', () => {
      const isShowingAll = true;
      const data = [{
        id: 1,
        title: 'dummy title',
        publication: 'NYT',
        'publish_date': '2017-01-01'
      }];

      const state = {
        suggestionApp: {
          suggestions: {
            REPORT: {
              isShowingAll: isShowingAll,
              data: data
            }
          }
        }
      };

      reportsSelector(state).should.be.eql({
        isShowingAll: isShowingAll,
        data: [{
          id: 1,
          title: 'dummy title',
          publication: 'NYT',
          publishDate: 'Jan 1, 2017'
        }]
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
});
