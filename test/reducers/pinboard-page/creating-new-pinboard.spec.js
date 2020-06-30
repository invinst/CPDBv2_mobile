import {
  PINBOARD_CREATE_NEW_REQUEST_START,
  PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
  PINBOARD_CREATE_NEW_REQUEST_FAILURE,
} from 'actions/pinboard';
import creatingNewPinboard from 'reducers/pinboard-page/creating-new-pinboard';


describe('creatingNewPinboard reducer', function () {
  it('should return initial state', function () {
    creatingNewPinboard(undefined, {}).should.be.false();
  });

  it('should handle PINBOARD_CREATE_NEW_REQUEST_START', function () {
    creatingNewPinboard(false, { type: PINBOARD_CREATE_NEW_REQUEST_START }).should.be.true();
  });

  it('should handle PINBOARD_CREATE_NEW_REQUEST_SUCCESS', function () {
    creatingNewPinboard(true, { type: PINBOARD_CREATE_NEW_REQUEST_SUCCESS }).should.be.false();
  });

  it('should handle PINBOARD_CREATE_NEW_REQUEST_FAILURE', function () {
    creatingNewPinboard(true, { type: PINBOARD_CREATE_NEW_REQUEST_FAILURE }).should.be.false();
  });
});
