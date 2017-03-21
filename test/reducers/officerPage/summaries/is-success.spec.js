import {
  OFFICER_SUMMARY_REQUEST_START,
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  OFFICER_SUMMARY_REQUEST_FAILURE
} from 'actions/officer';
import isSuccess from 'reducers/officerPage/summaries/is-success';


describe('isSuccess reducer', function () {
  it('should return initial state', function () {
    isSuccess(undefined, {}).should.be.false();
  });

  it('should handle OFFICER_SUMMARY_REQUEST_START', function () {
    isSuccess(false, {
      type: OFFICER_SUMMARY_REQUEST_START
    }).should.be.false();
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    isSuccess(false, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS
    }).should.be.true();
  });

  it('should handle OFFICER_SUMMARY_REQUEST_FAILURE', function () {
    isSuccess(true, {
      type: OFFICER_SUMMARY_REQUEST_FAILURE
    }).should.be.false();
  });
});
