import {
  OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE
} from 'actions/officer-page/timeline';
import isSuccess from 'reducers/officer-page/timeline/is-success';
import {
  OFFICER_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
} from 'actions/officer-page/timeline';


describe('isSuccess reducer', function () {
  it('should return initial state', function () {
    isSuccess(undefined, {}).should.be.true();
  });

  it('should handle OFFICER_TIMELINE_REQUEST_START', function () {
    isSuccess(false, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_START
    }).should.be.true();
  });

  it('should handle OFFICER_TIMELINE_REQUEST_SUCCESS', function () {
    isSuccess(false, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS
    }).should.be.true();
  });

  it('should handle OFFICER_TIMELINE_REQUEST_FAILURE', function () {
    isSuccess(true, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE
    }).should.be.false();
  });
});
