import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE
} from 'actions/officer-page/timeline';
import isRequesting from 'reducers/officer-page/timeline/is-requesting';
import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
} from 'actions/officer-page/timeline';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle OFFICER_TIMELINE_REQUEST_START', function () {
    isRequesting(false, {
      type: OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START
    }).should.be.true();
  });

  it('should handle OFFICER_TIMELINE_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS
    }).should.be.false();
  });

  it('should handle OFFICER_TIMELINE_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE
    }).should.be.false();
  });
});
