import {
  fetchOfficer,
  OFFICER_REQUEST_START,
  OFFICER_REQUEST_SUCCESS,
  OFFICER_REQUEST_FAILURE,
  requestCMS,
  OFFICER_PAGE_CMS_REQUEST_START,
  OFFICER_PAGE_CMS_REQUEST_SUCCESS,
  OFFICER_PAGE_CMS_REQUEST_FAILURE,
  resetTimelineFilter,
} from 'actions/officer-page';
import { OFFICER_API_ENDPOINT, OFFICER_PAGE_CMS_API_ENDPOINT } from 'constants';
import { v2Url } from 'utils/url-util';
import { RESET_TIME_LINE_FILTER } from 'constants/officer-page';


describe('officer actions', function () {
  describe('fetchOfficer', function () {
    it('should return right action', function () {
      fetchOfficer(11).should.eql({
        meta: { id: 11 },
        types: [OFFICER_REQUEST_START, OFFICER_REQUEST_SUCCESS, OFFICER_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${v2Url(OFFICER_API_ENDPOINT)}11/`,
            adapter: undefined,
            params: {},
          },
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
            url: v2Url(OFFICER_PAGE_CMS_API_ENDPOINT),
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });

  describe('resetTimelineFilter', function () {
    it('should return the right action', function () {
      resetTimelineFilter().should.eql({
        type: RESET_TIME_LINE_FILTER,
      });
    });
  });
});
