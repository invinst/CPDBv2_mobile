import {
  OFFICER_COACCUSALS_REQUEST_START,
  OFFICER_COACCUSALS_REQUEST_SUCCESS,
  OFFICER_COACCUSALS_REQUEST_FAILURE,
  getOfficerCoaccusals,
} from 'actions/officer-page/coaccusals';


describe('coaccusals actions', function () {
  describe('getOfficerCoaccusals', function () {
    it('should return right action', function () {
      getOfficerCoaccusals(123).should.eql({
        types: [
          OFFICER_COACCUSALS_REQUEST_START,
          OFFICER_COACCUSALS_REQUEST_SUCCESS,
          OFFICER_COACCUSALS_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: '/mobile/officers/123/coaccusals/',
            adapter: undefined,
            params: {}
          }
        },
        meta: {
          id: 123
        }
      });
    });
  });
});
