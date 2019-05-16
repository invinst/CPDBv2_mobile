import should from 'should';

import trrItemsReducer from 'reducers/pinboard-page/trr-items';
import { PINBOARD_TRRS_FETCH_REQUEST_SUCCESS } from 'actions/pinboard';


describe('Pinboard trrItemsReducer', function () {
  it('should have initial state', function () {
    should(trrItemsReducer(undefined, {})).eql([]);
  });

  it('should handle PINBOARD_TRRS_FETCH_REQUEST_SUCCESS', function () {
    trrItemsReducer([
      { 'id': 1 }],
      {
        type: PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
        payload: [
          { 'id': '2' }, { 'id': '3' },
        ]
      }
    ).should.deepEqual([{ 'id': '2' }, { 'id': '3' }]);
  });
});
