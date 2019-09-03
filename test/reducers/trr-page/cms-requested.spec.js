import { TRR_PAGE_CMS_REQUEST_SUCCESS } from 'actions/trr-page';
import cmsRequested from 'reducers/trr-page/cms-requested';


describe('cms reducer', function () {
  it('should return initial state', function () {
    cmsRequested(undefined, []).should.be.false();
  });

  it('should handle TRR_PAGE_CMS_REQUEST_SUCCESS', function () {
    cmsRequested({}, {
      type: TRR_PAGE_CMS_REQUEST_SUCCESS,
      payload: { fields: [1, 2] },
    }).should.be.true();
  });
});
