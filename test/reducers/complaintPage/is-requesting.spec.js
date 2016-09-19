import {
  COMPLAINT_PAGE_REQUEST_START, COMPLAINT_PAGE_REQUEST_SUCCESS, COMPLAINT_PAGE_REQUEST_FAILURE
} from 'actions/complaint';
import isRequesting from 'reducers/complaintPage/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle COMPLAINT_PAGE_REQUEST_START', function () {
    isRequesting(false, {
      type: COMPLAINT_PAGE_REQUEST_START
    }).should.be.true();
  });

  it('should handle COMPLAINT_PAGE_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: COMPLAINT_PAGE_REQUEST_SUCCESS
    }).should.be.false();
  });

  it('should handle COMPLAINT_PAGE_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: COMPLAINT_PAGE_REQUEST_FAILURE
    }).should.be.false();
  });
});
