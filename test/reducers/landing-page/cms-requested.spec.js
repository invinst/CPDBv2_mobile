import {
  LANDING_PAGE_CMS_REQUEST_SUCCESS,
  LANDING_PAGE_CMS_REQUEST_FAILURE,
} from 'actions/landing-page';
import cmsRequested from 'reducers/landing-page/cms-requested';


describe('cms reducer', function () {
  it('should return initial state', function () {
    cmsRequested(undefined, []).should.be.false();
  });

  it('should handle LANDING_PAGE_CMS_REQUEST_SUCCESS', function () {
    cmsRequested({}, {
      type: LANDING_PAGE_CMS_REQUEST_SUCCESS,
      payload: { fields: [1, 2] },
    }).should.be.true();
  });

  it('should handle LANDING_PAGE_CMS_REQUEST_FAILURE', function () {
    cmsRequested(false, {
      type: LANDING_PAGE_CMS_REQUEST_FAILURE,
      payload: {},
    }).should.be.false();

    cmsRequested(true, {
      type: LANDING_PAGE_CMS_REQUEST_FAILURE,
      payload: {},
    }).should.be.true();
  });
});
