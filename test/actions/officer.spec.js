import {
  getOfficer,
  OFFICER_PAGE_REQUEST_START, OFFICER_PAGE_REQUEST_SUCCESS, OFFICER_PAGE_REQUEST_FAILURE
} from 'actions/officer';
import constants from 'constants';


describe('suggestions actions', function () {
  describe('getOfficer', function () {
    it('should return right action', function () {
      getOfficer().should.eql({
        types: [OFFICER_PAGE_REQUEST_START, OFFICER_PAGE_REQUEST_SUCCESS, OFFICER_PAGE_REQUEST_FAILURE],
        payload: {
          request: {
            url: constants.OFFICER_API_ENDPOINT,
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });
});
