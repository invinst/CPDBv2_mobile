import { LANDING_PAGE_CMS_REQUEST_SUCCESS } from 'actions/landing-page';
import cms from 'reducers/landing-page/cms';


describe('cms reducer', function () {
  it('should return initial state', function () {
    cms(undefined, []).should.be.empty();
  });

  it('should handle LANDING_PAGE_CMS_REQUEST_SUCCESS', function () {
    cms({}, {
      type: LANDING_PAGE_CMS_REQUEST_SUCCESS,
      payload: { fields: [1, 2] }
    }).should.deepEqual([1, 2]);
  });
});
