import { COMPLAINT_PAGE_REQUEST_SUCCESS, COMPLAINT_PAGE_REQUEST_FAILURE } from 'actions/complaint';
import isSuccess from 'reducers/complaintPage/is-success';


describe('isSuccess reducer', function () {
  it('should return initial state', function () {
    isSuccess(undefined, {}).should.be.true();
  });

  it('should handle COMPLAINT_PAGE_REQUEST_SUCCESS', function () {
    isSuccess(false, {
      type: COMPLAINT_PAGE_REQUEST_SUCCESS
    }).should.be.true();
  });

  it('should handle COMPLAINT_PAGE_REQUEST_FAILURE', function () {
    isSuccess(true, {
      type: COMPLAINT_PAGE_REQUEST_FAILURE
    }).should.be.false();
  });
});
