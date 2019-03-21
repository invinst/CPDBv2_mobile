import { get, getUrl, post, put } from 'actions/common/async-action';


describe('async-action', function () {
  describe('get', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];

      get(url, types)().should.eql({
        types,
        payload: {
          request: {
            url,
            params: undefined,
            adapter: undefined
          }
        }
      });
    });
  });

  describe('getUrl', function () {
    it('should return the right action', function () {
      const url = 'http://localhost/dummy';
      const types = ['a', 'b', 'c'];
      const meta = { foo: 'bar' };

      getUrl(url, types, meta).should.eql({
        types,
        payload: {
          request: {
            url
          }
        },
        meta
      });
    });
  });

  describe('post', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };

      post(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'POST',
            data,
            adapter: undefined
          }
        }
      });
    });
  });

  describe('put', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };

      put(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'PUT',
            data,
            adapter: undefined
          }
        }
      });
    });
  });
});
