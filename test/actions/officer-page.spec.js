import {
  fetchOfficer,
  OFFICER_REQUEST_START,
  OFFICER_REQUEST_SUCCESS,
  OFFICER_REQUEST_FAILURE,
  requestCMS,
  OFFICER_PAGE_CMS_REQUEST_START,
  OFFICER_PAGE_CMS_REQUEST_SUCCESS,
  OFFICER_PAGE_CMS_REQUEST_FAILURE
} from 'actions/officer-page';
import constants from 'constants';
import { v2Url } from 'utils/url-util';


describe('officer actions', function () {
  describe('fetchOfficer', function () {
    it('should return right action', function () {
      fetchOfficer(11).should.eql({
        types: [OFFICER_REQUEST_START, OFFICER_REQUEST_SUCCESS, OFFICER_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${v2Url(constants.OFFICER_API_ENDPOINT)}11/`,
            adapter: undefined,
            params: {}
          }
        },
      });
    });
  });

  describe('requestCMS', function () {
    it('should return right action', function () {
      requestCMS().should.eql({
        types: [OFFICER_PAGE_CMS_REQUEST_START, OFFICER_PAGE_CMS_REQUEST_SUCCESS, OFFICER_PAGE_CMS_REQUEST_FAILURE],
        payload: {
          request: {
            url: v2Url(constants.OFFICER_PAGE_CMS_API_ENDPOINT),
            adapter: undefined,
            params: undefined
          }
        },
      });
    });
  });
});
