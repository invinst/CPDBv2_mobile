import {
  OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE
} from 'actions/officer';
import isRequesting from 'reducers/officerPage/summaries/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle OFFICER_SUMMARY_REQUEST_START', function () {
    isRequesting(false, {
      type: OFFICER_SUMMARY_REQUEST_START
    }).should.be.true();
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS
    }).should.be.false();
  });

  it('should handle OFFICER_SUMMARY_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: OFFICER_SUMMARY_REQUEST_FAILURE
    }).should.be.false();
  });
});
