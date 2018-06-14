import { TRR_REQUEST_START, TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE } from 'actions/trr-page';
import notFound from 'reducers/trrPage/not-found';


describe('notFound reducer', function () {
  it('should return initial state', function () {
    notFound(undefined, {}).should.be.false();
  });

  it('should handle TRR_REQUEST_START', function () {
    notFound(undefined, { type: TRR_REQUEST_START }).should.be.false();
  });

  it('should handle TRR_REQUEST_SUCCESS', function () {
    notFound(true, {
      type: TRR_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle TRR_REQUEST_FAILURE', function () {
    notFound(false, {
      type: TRR_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.true();
  });
});
