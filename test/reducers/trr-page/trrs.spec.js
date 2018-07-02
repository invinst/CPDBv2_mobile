import { TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE } from 'actions/trr-page';
import trrs from 'reducers/trr-page/trrs';


describe('trrs reducer', function () {
  it('should return initial state', function () {
    trrs(undefined, {}).should.be.empty();
  });

  it('should handle TRR_REQUEST_SUCCESS', function () {
    trrs({}, {
      type: TRR_REQUEST_SUCCESS,
      meta: { id: 1 },
      payload: { category: 'Firearm' }
    }).should.deepEqual({ 1: { category: 'Firearm' } });
  });

  it('should add more trr into state in case TRR_REQUEST_SUCCESS ', function () {
    trrs({ 1: { category: 'Firearm' } }, {
      type: TRR_REQUEST_SUCCESS,
      meta: { id: 2 },
      payload: { category: 'Other' }
    }).should.deepEqual({ 1: { category: 'Firearm' }, 2: { category: 'Other' } });
  });

  it('should replace the old trr which have same id ', function () {
    trrs({ 1: { category: 'Firearm' } }, {
      type: TRR_REQUEST_SUCCESS,
      meta: { id: 1 },
      payload: { category: 'Other' }
    }).should.deepEqual({ 1: { category: 'Other' } });
  });

  it('should handle TRR_REQUEST_FAILURE', function () {
    trrs({ 1: { category: 'Firearm' } }, {
      type: TRR_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.deepEqual({ 1: { category: 'Firearm' } });
  });
});
