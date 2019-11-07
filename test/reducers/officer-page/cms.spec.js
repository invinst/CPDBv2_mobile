import { OFFICER_PAGE_CMS_REQUEST_SUCCESS } from 'actions/officer-page';
import cms from 'reducers/officer-page/cms';


describe('cms reducer', function () {
  it('should return initial state', function () {
    cms(undefined, []).should.be.empty();
  });

  it('should handle OFFICER_PAGE_CMS_REQUEST_SUCCESS', function () {
    cms({}, {
      type: OFFICER_PAGE_CMS_REQUEST_SUCCESS,
      payload: { fields: [1, 2] },
    }).should.deepEqual([1, 2]);
  });
});
