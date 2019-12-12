import { SUGGESTION_SINGLE_REQUEST_SUCCESS } from 'actions/suggestion';

import pagination from 'reducers/suggestion-app/pagination';


describe('recentSuggestionsRequested reducer', function () {
  it('should have initial state', function () {
    pagination(undefined, {}).should.eql({});
  });

  it('should handle SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    pagination(undefined, {
      type: SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        count: 290,
        next: 'http://localhost:8000/api/v2/search-mobile/single/?contentType=OFFICER&limit=30&offset=30&term=123',
        previous: null,
      },
    }).should.be.eql({
      next: 'http://localhost:8000/api/v2/search-mobile/single/?contentType=OFFICER&limit=30&offset=30&term=123',
    });
  });
});
