import { hasMoreSelector, nextParamsSelector } from 'selectors/faq-page';

describe('faq-page selectors', () => {
  describe('hasMoreSelector', () => {
    it('should return true when next url exists and is not requesting', () => {
      const state = {
        faqPage: {
          pagination: {
            next: 'http://localhost:9000/api/v2/faqs/?limit=20&offset=40'
          },
          isRequesting: false
        }
      };
      hasMoreSelector(state).should.be.true();
    });

    it('should return false when next url does not exist', () => {
      const state = {
        faqPage: {
          pagination: {
            next: null
          },
          isRequesting: false
        }
      };
      hasMoreSelector(state).should.be.false();
    });

    it('should return false when a request is in progress', () => {
      const state = {
        faqPage: {
          pagination: {
            next: 'http://localhost:9000/api/v2/faqs/?limit=20&offset=40'
          },
          isRequesting: true
        }
      };
      hasMoreSelector(state).should.be.false();
    });
  });

  describe('nextParamsSelector', () => {
    it('should return correct data from state', () => {
      const state = {
        faqPage: {
          pagination: {
            next: 'http://localhost:9000/api/v2/faqs/?limit=20&offset=40'
          }
        }
      };
      nextParamsSelector(state).should.be.eql({
        limit: '20',
        offset: '40'
      });
    });
  });
});
