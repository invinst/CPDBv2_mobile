import { TRR_PAGE_CMS_REQUEST_SUCCESS, TRR_PAGE_CMS_REQUEST_FAILURE } from 'actions/trr-page';
import cms from 'reducers/trr-page/cms';


describe('cms reducer', function () {
  it('should return initial state', function () {
    cms(undefined, []).should.be.empty();
  });

  it('should handle TRR_PAGE_CMS_REQUEST_SUCCESS', function () {
    cms({}, {
      type: TRR_PAGE_CMS_REQUEST_SUCCESS,
      payload: { fields: [1, 2] }
    }).should.deepEqual([1, 2]);
  });

  it('should handle TRR_PAGE_CMS_REQUEST_FAILURE', function () {
    cms([2, 3], {
      type: TRR_PAGE_CMS_REQUEST_FAILURE,
      payload: {}
    }).should.deepEqual([2, 3]);
  });
});
