import should from 'should';

import crItemsReducer from 'reducers/pinboard-page/cr-items';
import { PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS } from 'actions/pinboard';


describe('crItemsReducer', function () {
  it('should have initial state', function () {
    should(crItemsReducer(undefined, {})).eql([]);
  });

  it('should handle PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS', function () {
    crItemsReducer(
      [{ 'crid': '1' }],
      {
        type: PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
        payload: [
          { 'crid': '2' }, { 'crid': '3' },
        ]
      }
    ).should.deepEqual([{ 'crid': '2' }, { 'crid': '3' }]);
  });
});
