import { OFFICER_PAGE_CMS_REQUEST_SUCCESS, OFFICER_PAGE_CMS_REQUEST_FAILURE } from 'actions/officer-page';
import cms from 'reducers/officer-page/cms';


describe('cms reducer', function () {
  it('should return initial state', function () {
    cms(undefined, []).should.be.empty();
  });

  it('should handle OFFICER_PAGE_CMS_REQUEST_SUCCESS', function () {
    cms({}, {
      type: OFFICER_PAGE_CMS_REQUEST_SUCCESS,
      payload: { fields: [1, 2] }
    }).should.deepEqual([1, 2]);
  });

  it('should handle OFFICER_PAGE_CMS_REQUEST_FAILURE', function () {
    cms([2, 3], {
      type: OFFICER_PAGE_CMS_REQUEST_FAILURE,
      payload: {}
    }).should.deepEqual([2, 3]);
  });
});
