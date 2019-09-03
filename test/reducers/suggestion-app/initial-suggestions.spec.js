import initialSuggestions from 'reducers/suggestion-app/initial-suggestions';
import {
  FETCH_SUGGESTED_SEARCH_ITEMS_SUCCESS,
  FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE,
  SEARCH_SAVE_TO_RECENT,
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
    initialSuggestions({}, {
      type: FETCH_SUGGESTED_SEARCH_ITEMS_FAILURE,
    }).should.eql({
      recent: {
        data: [],
      },
      suggested: {
        data: [],
      },
    });
  });

  it('should handle SEARCH_SAVE_TO_RECENT', function () {
    initialSuggestions({
      recent: {
        data: [
          { type: 'first_type', data: 'first_data' },
          { type: 'second_type', data: 'second_data' },
        ],
      },
    }, {
      type: SEARCH_SAVE_TO_RECENT,
      payload: {
        type: 'first_type',
        data: 'payload_data',
      },
    }).should.eql({
      recent: {
        data: [
          { type: 'second_type', data: 'second_data' },
          { type: 'first_type', data: 'payload_data' },
        ],
      },
    });
  });
});
