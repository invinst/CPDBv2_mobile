import data from 'reducers/officer-page/timeline/data';
import {
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
} from 'actions/officer-page/timeline';


describe('data reducer', function () {
  it('should have initial state', function () {
    data(undefined, {}).should.eql({});
  });

  it('should handle OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS', function () {
    data({
      1: 'timeline1',
      2: 'timeline2',
    }, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
      meta: {
        id: 3,
      },
      payload: 'timeline3',
    }).should.eql({
      1: 'timeline1',
      2: 'timeline2',
      3: 'timeline3',
    });
  });

  it('should handle OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE', function () {
    data({
      1: 'timeline1',
      2: 'timeline2',
    }, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
      meta: {
        id: 3,
      },
      payload: 'timeline3',
    }).should.eql({
      1: 'timeline1',
      2: 'timeline2',
    });
  });
});
