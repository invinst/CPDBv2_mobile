import {
  getComplaint, toggleOpen, toggleClose,
  COMPLAINT_PAGE_REQUEST_START, COMPLAINT_PAGE_REQUEST_SUCCESS, COMPLAINT_PAGE_REQUEST_FAILURE,
  COMPLAINT_PAGE_TOGGLE_OPEN, COMPLAINT_PAGE_TOGGLE_CLOSE
} from 'actions/complaint';
import constants from 'constants';


describe('suggestions actions', function () {
  describe('getComplaint', function () {
    it('should return right action', function () {
      getComplaint().should.eql({
        types: [COMPLAINT_PAGE_REQUEST_START, COMPLAINT_PAGE_REQUEST_SUCCESS, COMPLAINT_PAGE_REQUEST_FAILURE],
        payload: {
          request: {
            url: constants.ALLEGATION_API_ENDPOINT,
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });

  describe('toggleOpen', function () {
    it('should return right action', function () {
      toggleOpen().should.eql({
        type: COMPLAINT_PAGE_TOGGLE_OPEN
      });
    });
  });

  describe('toggleClose', function () {
    it('should return right action', function () {
      toggleClose().should.eql({
        type: COMPLAINT_PAGE_TOGGLE_CLOSE
      });
    });
  });
});
