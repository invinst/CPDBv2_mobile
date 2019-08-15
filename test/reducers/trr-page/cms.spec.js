import { TRR_PAGE_CMS_REQUEST_SUCCESS } from 'actions/trr-page';
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
});
