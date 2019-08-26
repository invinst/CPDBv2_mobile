import isSuccess from 'reducers/officer-page/coaccusals/is-success';
import {
  OFFICER_COACCUSALS_REQUEST_START,
  OFFICER_COACCUSALS_REQUEST_SUCCESS,
  OFFICER_COACCUSALS_REQUEST_FAILURE,
} from 'actions/officer-page/coaccusals';


describe('isSuccess reducer', function () {
  it('should return initial state', function () {
    isSuccess(undefined, {}).should.be.false();
  });

  it('should handle OFFICER_COACCUSALS_REQUEST_START', function () {
    isSuccess(false, {
      type: OFFICER_COACCUSALS_REQUEST_START,
    }).should.be.true();
  });

  it('should handle OFFICER_COACCUSALS_REQUEST_SUCCESS', function () {
    isSuccess(false, {
      type: OFFICER_COACCUSALS_REQUEST_SUCCESS,
    }).should.be.true();
  });

  it('should handle OFFICER_COACCUSALS_REQUEST_FAILURE', function () {
    isSuccess(true, {
      type: OFFICER_COACCUSALS_REQUEST_FAILURE,
    }).should.be.false();
  });
});
