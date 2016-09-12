import {
  OFFICER_PAGE_REQUEST_START, OFFICER_PAGE_REQUEST_SUCCESS, OFFICER_PAGE_REQUEST_FAILURE
} from 'actions/officer';
import isRequesting from 'reducers/officerPage/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle OFFICER_PAGE_REQUEST_START', function () {
    isRequesting(false, {
      type: OFFICER_PAGE_REQUEST_START
    }).should.be.true();
  });

  it('should handle OFFICER_PAGE_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: OFFICER_PAGE_REQUEST_SUCCESS
    }).should.be.false();
  });

  it('should handle OFFICER_PAGE_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: OFFICER_PAGE_REQUEST_FAILURE
    }).should.be.false();
  });
});
