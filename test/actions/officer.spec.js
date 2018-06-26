import {
  getOfficerSummary,
  getMoreOfficerTimeline,
  OFFICER_SUMMARY_REQUEST_START,
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  OFFICER_SUMMARY_REQUEST_FAILURE
} from 'actions/officer';
import constants from 'constants';
import { v2Url } from 'utils/url-util';
import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE, getOfficerTimeline,
} from 'actions/officer-page/timeline';


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

  describe('getOfficerTimeline', function () {
    it('should return right action', function () {

      getOfficerTimeline(11).should.eql({
        types: [OFFICER_NEW_TIMELINE_ITEMS_REQUEST_START, OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${v2Url(constants.OLD_OFFICER_API_ENDPOINT)}11/timeline-items/`,
            adapter: undefined,
            params: {}
          }
        },
        meta: {
          id: 11
        }
      });
    });
  });

  describe('getMoreOfficerTimeline', function () {
    it('should return right action', function () {

      getMoreOfficerTimeline(11, 'http://localhost/').should.eql({
        types: ['_SKIP', OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_NEW_TIMELINE_ITEMS_REQUEST_FAILURE],
        payload: {
          request: {
            url: 'http://localhost/'
          }
        },
        meta: {
          id: 11
        }
      });
    });
  });
});
