import recentSuggestions from 'reducers/suggestion-app/recent-suggestions';
import { SEARCH_SAVE_TO_RECENT } from 'actions/suggestion';


describe('recentSuggestions reducer', function () {
  it('should have initial state', function () {
    recentSuggestions(undefined, {}).should.eql([]);
  });

  it('should handle SEARCH_SAVE_TO_RECENT', function () {
    recentSuggestions([
      { type: 'first_type', data: 'first_data' },
      { type: 'second_type', data: 'second_data' },
    ],
    {
      type: SEARCH_SAVE_TO_RECENT,
      payload: {
        type: 'first_type',
        data: 'payload_data',
      },
    }).should.eql([
      { type: 'second_type', data: 'second_data' },
      { type: 'first_type', data: 'payload_data' },
    ]);
  });
});
