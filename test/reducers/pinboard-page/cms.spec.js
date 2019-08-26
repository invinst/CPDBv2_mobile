import { PINBOARD_PAGE_CMS_REQUEST_SUCCESS } from 'actions/pinboard';
import cms from 'reducers/pinboard-page/cms';


describe('cms reducer', function () {
  it('should return initial state', function () {
    cms(undefined, []).should.be.empty();
  });

  it('should handle PINBOARD_PAGE_CMS_REQUEST_SUCCESS', function () {
    cms({}, {
      type: PINBOARD_PAGE_CMS_REQUEST_SUCCESS,
      payload: { fields: [1, 2] },
    }).should.deepEqual([1, 2]);
  });
});
