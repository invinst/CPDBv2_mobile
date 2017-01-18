import should from 'should'; // eslint-disable-line no-unused-vars
import { extractQuery } from 'utils/QueryStringUtil';

describe('QueryStringUtil', () => {
  describe('extractQuery', () => {
    it('should parse multiple URL params correctly', () => {
      const data = extractQuery('http://localhost:9000/api/v2/reports/?limit=20&offset=40');
      data.should.be.eql({
        limit: '20',
        offset: '40'
      });
    });

    it('should return empty object if url is empty', () => {
      const data = extractQuery('');
      data.should.be.eql({});
    });

    it('should return empty object if url does not have params', () => {
      const data = extractQuery('http://localhost:9000/api/v2/reports');
      data.should.be.eql({});
    });

    it('should return empty object if url only has trailing `?`', () => {
      const data = extractQuery('http://localhost:9000/api/v2/reports?');
      data.should.be.eql({});
    });
  });
});
