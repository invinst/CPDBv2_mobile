import items from 'reducers/officer-page/timeline/items';
import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE,
} from 'actions/officer-page/timeline';


describe('items reducer', function () {
  it('should have initial state', function () {
    items(undefined, {}).should.eql([]);
  });

  it('should handle OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS', function () {
    items([1, 2], {
      type: OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
      payload: [3, 4, 5]
    }).should.eql([3, 4, 5]);
  });

  it('should handle OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE', function () {
    items([1, 2], {
      type: OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE,
      payload: [3, 4, 5]
    }).should.eql([1, 2]);
  });
});
