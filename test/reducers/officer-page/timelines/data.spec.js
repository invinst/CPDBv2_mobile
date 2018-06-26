import { OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE } from 'actions/officer-page/timeline';
import timelineData from 'reducers/officer-page/timeline/items';
import { OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS } from 'actions/officer-page/timeline';


describe('officer summary data reducer', function () {
  it('should return initial state', function () {
    timelineData(undefined, {}).should.eql({});
  });

  describe('OFFICER_TIMELINE_REQUEST_SUCCESS', function () {

    it('should update timeline results', function () {
      const response = {
        count: 9,
        previous: 'http://data/?limit=3',
        next: 'http://data/?limit=3&offset=3',
        results: ['a', 'b', 'c']
      };

      timelineData({}, {
        type: OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
        payload: response,
        meta: {
          id: 11
        }
      }).should.eql({
        11: {
          count: 9,
          previous: 'http://data/?limit=3',
          next: 'http://data/?limit=3&offset=3',
          results: ['a', 'b', 'c']
        }
      });
    });

    it('should append timeline results if already existing', function () {
      const response = {
        count: 9,
        previous: 'http://data/?limit=3&offset=3',
        next: 'http://data/?limit=3&offset=6',
        results: ['d', 'e', 'f']
      };

      const currentState = {
        11: {
          count: 9,
          previous: 'http://data/?limit=3',
          next: 'http://data/?limit=3&offset=3',
          results: ['a', 'b', 'c']
        }
      };

      timelineData(
        currentState,
        {
          type: OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
          payload: response,
          meta: {
            id: 11
          }
        }).should.eql({
          11: {
            count: 9,
            previous: 'http://data/?limit=3&offset=3',
            next: 'http://data/?limit=3&offset=6',
            results: ['a', 'b', 'c', 'd', 'e', 'f']
          }
        });
    });
  });

  it('should handle OFFICER_SUMMARY_REQUEST_FAILURE', function () {
    timelineData({}, {
      type: OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE
    }).should.eql({});
  });
});
