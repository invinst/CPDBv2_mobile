import { OFFICER_PAGE_REQUEST_SUCCESS, OFFICER_PAGE_REQUEST_FAILURE } from 'actions/officer';
import isSuccess from 'reducers/officerPage/is-success';


describe('isSuccess reducer', function () {
  it('should return initial state', function () {
    isSuccess(undefined, {}).should.be.true();
  });

  it('should handle OFFICER_PAGE_REQUEST_SUCCESS', function () {
    isSuccess(false, {
      type: OFFICER_PAGE_REQUEST_SUCCESS
    }).should.be.true();
  });

  it('should handle OFFICER_PAGE_REQUEST_FAILURE', function () {
    isSuccess(true, {
      type: OFFICER_PAGE_REQUEST_FAILURE
    }).should.be.false();
  });
});
