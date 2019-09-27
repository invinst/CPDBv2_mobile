import initialSuggestions from 'reducers/suggestion-app/initial-suggestions';
import {
  FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
  FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE,
  SEARCH_SAVE_TO_RECENT,
  FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
} from 'actions/suggestion';


describe('initialSuggestions reducer', function () {
  it('should have initial state', function () {
    initialSuggestions(undefined, {}).should.eql({
      recent: {
        data: [],
      },
      suggested: {
        data: [],
      },
    });
  });

  it('should handle FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS with no data category', function () {
    initialSuggestions({}, {
      type: FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
      payload: {
        'COMPLAINT': [],
      },
    }).should.eql({
      suggested: {
        data: [],
      },
    });
  });

  it('should handle FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS wrong category', function () {
    initialSuggestions({}, {
      type: FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
      payload: {
        'COMPLAINT': [
          { crid: '123456', text: 'This is complaint 123456' },
        ],
      },
    }).should.eql({
      suggested: {
        data: [],
      },
    });
  });

  it('should handle FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS with OFFICER category', function () {
    initialSuggestions({}, {
      type: FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
      payload: {
        'OFFICER': [
          { id: 123, name: 'Jerome Finnigan' },
        ],
      },
    }).should.eql({
      suggested: {
        data: [{
          title: 'Jerome Finnigan',
          type: 'Officer',
          url: '/officer/123/jerome-finnigan/',
        }],
      },
    });
  });

  it('should handle FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS with UNIT category', function () {
    initialSuggestions({}, {
      type: FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
      payload: {
        'UNIT': [
          { url: '/unit/232/', text: '715 - Public Housing Unit' },
        ],
      },
    }).should.eql({
      suggested: {
        data: [{
          title: '715 - Public Housing Unit',
          type: 'Unit',
          url: '/unit/232/',
        }],
      },
    });
  });

  it('should handle FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE', function () {
    initialSuggestions({
      recent: {
        data: [
          { type: 'OFFICER', id: 8562, data: {} },
          { type: 'CR', id: '271235', data: {} },
        ],
      },
    }, {
      type: FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE,
    }).should.eql({
      recent: {
        data: [
          { type: 'OFFICER', id: 8562, data: {} },
          { type: 'CR', id: '271235', data: {} },
        ],
      },
      suggested: {
        data: [],
      },
    });
  });

  describe('handle SEARCH_SAVE_TO_RECENT', function () {
    it('with new item', function () {
      initialSuggestions({
        recent: {
          data: [
            { type: 'OFFICER', id: 8562, data: {} },
            { type: 'CR', id: '271235', data: {} },
          ],
        },
      }, {
        type: SEARCH_SAVE_TO_RECENT,
        payload: {
          type: 'TRR',
          id: 123456,
          data: {
            type: 'TRR',
            id: 123456,
          },
        },
      }).should.eql({
        recent: {
          data: [
            { type: 'TRR', id: 123456, data: { type: 'TRR', id: 123456 } },
            { type: 'OFFICER', id: 8562, data: {} },
            { type: 'CR', id: '271235', data: {} },
          ],
        },
      });
    });

    it('with item already in the recent list', function () {
      initialSuggestions({
        recent: {
          data: [
            { type: 'OFFICER', id: 8562, data: { type: 'OFFICER', id: 8562 } },
            { type: 'CR', id: '271235', data: { type: 'CR', id: '271235' } },
            { type: 'TRR', id: 123456, data: { type: 'TRR', id: 123456 } },
          ],
        },
      }, {
        type: SEARCH_SAVE_TO_RECENT,
        payload: {
          type: 'CR',
          id: '271235',
          data: {
            type: 'CR',
            id: '271235',
          },
        },
      }).should.eql({
        recent: {
          data: [
            { type: 'CR', id: '271235', data: { type: 'CR', id: '271235' } },
            { type: 'OFFICER', id: 8562, data: { type: 'OFFICER', id: 8562 } },
            { type: 'TRR', id: 123456, data: { type: 'TRR', id: 123456 } },
          ],
        },
      });
    });
  });

  it('should handle FETCH_RECENT_SEARCH_ITEMS_SUCCESS', function () {
    initialSuggestions({
      recent: {
        data: [
          { type: 'TRR', id: 123, data: {} },
          { type: 'CR', id: '1088234', data: {} },
          { type: 'OFFICER', id: 15499, data: {} },
        ],
      },
    }, {
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
    }).should.eql({
      recent: {
        data: [
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
        ],
      },
    });
  });
});
