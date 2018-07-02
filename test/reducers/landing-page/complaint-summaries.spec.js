import {
  COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
  COMPLAINT_SUMMARIES_REQUEST_FAILURE
} from 'actions/landing-page';
import complaintSummaries from 'reducers/landing-page/complaint-summaries';


describe('complaintSummaries reducer', function () {
  it('should return initial state', function () {
    complaintSummaries(undefined, []).should.be.empty();
  });

  it('should handle COMPLAINT_SUMMARIES_REQUEST_SUCCESS', function () {
    complaintSummaries({}, {
      type: COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
      payload: 'abc'
    }).should.eql('abc');
  });

  it('should handle COMPLAINT_SUMMARIES_REQUEST_FAILURE', function () {
    complaintSummaries('abc', {
      type: COMPLAINT_SUMMARIES_REQUEST_FAILURE,
      payload: {}
    }).should.eql('abc');
  });
});
