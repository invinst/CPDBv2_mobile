import { OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE } from 'actions/officer';
import officerData from 'reducers/officerPage/summaries/data';


describe('officer summary data reducer', function () {
  it('should return initial state', function () {
    officerData(undefined, {}).should.eql({});
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    const officerResult = { id: 1, name: 'John' };

    officerData({}, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: officerResult
    }).should.eql({
      1: officerResult
    });
  });

  it('should handle OFFICER_SUMMARY_REQUEST_FAILURE', function () {
    officerData({}, {
      type: OFFICER_SUMMARY_REQUEST_FAILURE
    }).should.eql({});
  });
});
