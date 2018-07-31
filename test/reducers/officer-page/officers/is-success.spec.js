import {
  OFFICER_REQUEST_START,
  OFFICER_REQUEST_SUCCESS,
  OFFICER_REQUEST_FAILURE
} from 'actions/officer-page';
import isSuccess from 'reducers/officer-page/officers/is-success';


describe('isSuccess reducer', function () {
  it('should return initial state', function () {
    isSuccess(undefined, {}).should.be.true();
  });

  it('should handle OFFICER_REQUEST_START', function () {
    isSuccess(false, {
      type: OFFICER_REQUEST_START
    }).should.be.true();
  });

  it('should handle OFFICER_REQUEST_SUCCESS', function () {
    isSuccess(false, {
      type: OFFICER_REQUEST_SUCCESS
    }).should.be.true();
  });

  it('should handle OFFICER_REQUEST_FAILURE', function () {
    isSuccess(true, {
      type: OFFICER_REQUEST_FAILURE
    }).should.be.false();
  });
});
