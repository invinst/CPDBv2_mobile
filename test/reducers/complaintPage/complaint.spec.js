import { COMPLAINT_PAGE_REQUEST_SUCCESS, COMPLAINT_PAGE_REQUEST_FAILURE } from 'actions/complaint';
import complaint from 'reducers/complaintPage/complaint';


describe('complaint reducer', function () {
  it('should return initial state', function () {
    complaint(undefined, {}).should.eql({});
  });

  it('should handle COMPLAINT_PAGE_REQUEST_SUCCESS', function () {
    const officerResult = { a: 1 };

    complaint({}, {
      type: COMPLAINT_PAGE_REQUEST_SUCCESS,
      payload: officerResult
    }).should.eql(officerResult);
  });

  it('should handle COMPLAINT_PAGE_REQUEST_FAILURE', function () {
    complaint({}, {
      type: COMPLAINT_PAGE_REQUEST_FAILURE
    }).should.eql({});
  });
});
