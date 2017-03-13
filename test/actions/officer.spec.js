import {
  getOfficerSummary,
  getOfficerTimeline,
  OFFICER_SUMMARY_REQUEST_START,
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  OFFICER_SUMMARY_REQUEST_FAILURE,
  OFFICER_TIMELINE_REQUEST_START,
  OFFICER_TIMELINE_REQUEST_SUCCESS,
  OFFICER_TIMELINE_REQUEST_FAILURE
} from 'actions/officer';
import constants from 'constants';
import { v2v2Url } from 'utils/UrlUtil';


describe('officer actions', function () {
  describe('getOfficerSummary', function () {
    it('should return right action', function () {

      getOfficerSummary(11).should.eql({
        types: [OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${v2v2Url(constants.OFFICER_API_ENDPOINT)}11/summary/`,
            adapter: undefined,
            params: {}
          }
        }
      });
    });
  });

  describe('getOfficerTimeline', function () {
    it('should return right action', function () {

      getOfficerTimeline(11).should.eql({
        types: [OFFICER_TIMELINE_REQUEST_START, OFFICER_TIMELINE_REQUEST_SUCCESS, OFFICER_TIMELINE_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${v2v2Url(constants.OFFICER_API_ENDPOINT)}11/timeline/`,
            adapter: undefined,
            params: {}
          }
        }
      });
    });
  });
});
