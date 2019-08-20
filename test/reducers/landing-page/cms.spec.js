import {
  LANDING_PAGE_CMS_REQUEST_SUCCESS,
  LANDING_PAGE_CMS_REQUEST_FAILURE,
} from 'actions/landing-page';
import cms from 'reducers/landing-page/cms';


describe('cms reducer', function () {
  it('should return initial state', function () {
    cms(undefined, []).should.be.empty();
  });

  it('should handle LANDING_PAGE_CMS_REQUEST_SUCCESS', function () {
    cms({}, {
      type: LANDING_PAGE_CMS_REQUEST_SUCCESS,
      payload: { fields: [1, 2] },
    }).should.deepEqual([1, 2]);
  });

  it('should handle LANDING_PAGE_CMS_REQUEST_FAILURE', function () {
    cms([2, 3], {
      type: LANDING_PAGE_CMS_REQUEST_FAILURE,
      payload: {},
    }).should.deepEqual([2, 3]);
  });
});
