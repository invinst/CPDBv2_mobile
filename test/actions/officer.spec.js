import {
  getOfficerSummary,
  fetchOfficer,
  OFFICER_SUMMARY_REQUEST_START,
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  OFFICER_SUMMARY_REQUEST_FAILURE,
  OFFICER_REQUEST_START,
  OFFICER_REQUEST_SUCCESS,
  OFFICER_REQUEST_FAILURE
} from 'actions/officer';
import constants from 'constants';
import { v2Url } from 'utils/url-util';


describe('officer actions', function () {
  describe('getOfficerSummary', function () {
    it('should return right action', function () {

      getOfficerSummary(11).should.eql({
        types: [OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${v2Url(constants.OLD_OFFICER_API_ENDPOINT)}11/summary/`,
            adapter: undefined,
            params: {}
          }
        }
      });
    });
  });

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
});
