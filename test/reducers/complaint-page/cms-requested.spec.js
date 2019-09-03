import { COMPLAINT_PAGE_CMS_REQUEST_SUCCESS } from 'actions/complaint-page';
import cmsRequested from 'reducers/complaint-page/cms-requested';


describe('cms reducer', function () {
  it('should return initial state', function () {
    cmsRequested(undefined, []).should.be.false();
  });

  it('should handle COMPLAINT_PAGE_CMS_REQUEST_SUCCESS', function () {
    cmsRequested({}, {
      type: COMPLAINT_PAGE_CMS_REQUEST_SUCCESS,
      payload: { fields: [1, 2] },
    }).should.be.true();
  });
});
