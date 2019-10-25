import recentSuggestions from 'reducers/suggestion-app/recent-suggestions';
import {
  SEARCH_SAVE_TO_RECENT,
  FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
} from 'actions/suggestion';


describe('recentSuggestions reducer', function () {
  it('should have initial state', function () {
    recentSuggestions(undefined, {}).should.eql([]);
  });

  describe('handle SEARCH_SAVE_TO_RECENT', function () {
    it('with new item', function () {
      recentSuggestions([
        { type: 'OFFICER', id: 8562, data: {} },
        { type: 'CR', id: '271235', data: {} },
      ], {
        type: SEARCH_SAVE_TO_RECENT,
        payload: {
          type: 'TRR',
          id: 123456,
          data: {
            type: 'TRR',
            id: 123456,
          },
        },
      }).should.eql([
        { type: 'TRR', id: 123456, data: { type: 'TRR', id: 123456 } },
        { type: 'OFFICER', id: 8562, data: {} },
        { type: 'CR', id: '271235', data: {} },
      ]);
    });

    it('with item already in the recent list', function () {
      recentSuggestions([
        { type: 'OFFICER', id: 8562, data: { type: 'OFFICER', id: 8562 } },
        { type: 'CR', id: '271235', data: { type: 'CR', id: '271235' } },
        { type: 'TRR', id: 123456, data: { type: 'TRR', id: 123456 } },
      ], {
        type: SEARCH_SAVE_TO_RECENT,
        payload: {
          type: 'CR',
          id: '271235',
          data: {
            type: 'CR',
            id: '271235',
          },
        },
      }).should.eql([
        { type: 'CR', id: '271235', data: { type: 'CR', id: '271235' } },
        { type: 'OFFICER', id: 8562, data: { type: 'OFFICER', id: 8562 } },
        { type: 'TRR', id: 123456, data: { type: 'TRR', id: 123456 } },
      ]);
    });
  });

  it('should handle FETCH_RECENT_SEARCH_ITEMS_SUCCESS', function () {
    recentSuggestions([
      { type: 'TRR', id: 123, data: {} },
      { type: 'CR', id: '1088234', data: {} },
      { type: 'OFFICER', id: 15499, data: {} },
    ], {
      type: FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
      payload: [
        {
          'id': 15499,
          'name': 'Arthur La Pointe',
          'badge': '67',
          'type': 'OFFICER',
        },
        {
          'id': '1088234',
          'crid': '1088234',
          'incident_date': '2016-11-30',
          'category': 'Use of Force',
          'type': 'CR',
        },
        {
          'id': 123,
          'type': 'TRR',
        },
      ],
    }).should.eql([
      {
        type: 'TRR',
        id: 123,
        data: {
          'id': 123,
          'type': 'TRR',
        },
      },
      {
        type: 'CR',
        id: '1088234',
        data: {
          'id': '1088234',
          'crid': '1088234',
          'incident_date': '2016-11-30',
          'category': 'Use of Force',
          'type': 'CR',
        },
      },
      {
        type: 'OFFICER',
        id: 15499,
        data: {
          'id': 15499,
          'name': 'Arthur La Pointe',
          'badge': '67',
          'type': 'OFFICER',
        },
      },
    ]);
  });
});
