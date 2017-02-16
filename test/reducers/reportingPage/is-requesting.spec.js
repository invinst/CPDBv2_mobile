import {
  REPORTING_PAGE_REQUEST_START, REPORTING_PAGE_REQUEST_SUCCESS, REPORTING_PAGE_REQUEST_FAILURE
} from 'actions/reporting-page';
import isRequesting from 'reducers/reportingPage/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle REPORTING_PAGE_REQUEST_START', function () {
    isRequesting(false, {
      type: REPORTING_PAGE_REQUEST_START
    }).should.be.true();
  });

  it('should handle REPORTING_PAGE_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: REPORTING_PAGE_REQUEST_SUCCESS
    }).should.be.false();
  });

  it('should handle REPORTING_PAGE_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: REPORTING_PAGE_REQUEST_FAILURE
    }).should.be.false();
  });
});
