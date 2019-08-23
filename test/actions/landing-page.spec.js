import constants from 'constants';
import { v2Url } from 'utils/url-util';
import * as actions from 'actions/landing-page';


describe('landing-page actions', function () {
  describe('requestCMS', function () {
    it('should return right action', function () {
      actions.requestCMS().should.eql({
        types: [
          actions.LANDING_PAGE_CMS_REQUEST_START,
          actions.LANDING_PAGE_CMS_REQUEST_SUCCESS,
          actions.LANDING_PAGE_CMS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.LANDING_PAGE_CMS_API_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });

  describe('requestTopOfficersByAllegation', function () {
    it('should return right action', function () {
      actions.requestTopOfficersByAllegation().should.eql({
        types: [
          actions.TOP_OFFICERS_BY_ALLEGATION_REQUEST_START,
          actions.TOP_OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS,
          actions.TOP_OFFICERS_BY_ALLEGATION_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.TOP_OFFICERS_BY_ALLEGATION_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });

  describe('requestRecentActivities', function () {
    it('should return right action', function () {
      actions.requestRecentActivities().should.eql({
        types: [
          actions.RECENT_ACTIVITIES_REQUEST_START,
          actions.RECENT_ACTIVITIES_REQUEST_SUCCESS,
          actions.RECENT_ACTIVITIES_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.RECENT_ACTIVITIES_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });

  describe('requestNewDocumentAllegations', function () {
    it('should return right action', function () {
      actions.requestNewDocumentAllegations().should.eql({
        types: [
          actions.NEW_DOCUMENT_ALLEGATIONS_REQUEST_START,
          actions.NEW_DOCUMENT_ALLEGATIONS_REQUEST_SUCCESS,
          actions.NEW_DOCUMENT_ALLEGATIONS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.NEW_DOCUMENT_ALLEGATIONS_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });

  describe('requestComplaintSummaries', function () {
    it('should return right action', function () {
      actions.requestComplaintSummaries().should.eql({
        types: [
          actions.COMPLAINT_SUMMARIES_REQUEST_START,
          actions.COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
          actions.COMPLAINT_SUMMARIES_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(constants.COMPLAINT_SUMMARIES_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });
});
