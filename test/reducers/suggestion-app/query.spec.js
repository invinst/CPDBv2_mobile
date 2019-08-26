import { SEARCH_INPUT_CHANGED, SEARCH_CLEAR, SEARCH_RESET } from 'actions/suggestion';
import query from 'reducers/suggestion-app/query';


describe('query reducer', function () {
  it('should return initial state', function () {
    query(undefined, {}).should.eql('');
  });

  it('should handle SEARCH_INPUT_CHANGED', function () {
    const queryString = 'queryString';

    query('', {
      type: SEARCH_INPUT_CHANGED,
      payload: queryString,
    }).should.eql(queryString);
  });

  it('should handle SEARCH_CLEAR', function () {
    query('query', {
      type: SEARCH_CLEAR,
    }).should.eql('');
  });

  it('should handle SEARCH_RESET', function () {
    query('query', {
      type: SEARCH_RESET,
    }).should.eql('');
  });
});
