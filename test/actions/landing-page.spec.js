import {
  COMPLAINT_SUMMARIES_ENDPOINT,
  LANDING_PAGE_CMS_API_ENDPOINT,
  TOP_OFFICERS_BY_ALLEGATION_ENDPOINT,
  RECENT_ACTIVITIES_ENDPOINT,
  NEW_DOCUMENT_ALLEGATIONS_ENDPOINT,
  TOP_LAWSUITS_ENDPOINT,
} from 'constants';
import { v2Url } from 'utils/url-util';
import {
  requestCMS,
  requestTopOfficersByAllegation,
  requestRecentActivities,
  requestNewDocumentAllegations,
  requestComplaintSummaries,
  requestTopLawsuits,
  LANDING_PAGE_CMS_REQUEST_START,
  LANDING_PAGE_CMS_REQUEST_SUCCESS,
  LANDING_PAGE_CMS_REQUEST_FAILURE,
  TOP_OFFICERS_BY_ALLEGATION_REQUEST_START,
  TOP_OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS,
  TOP_OFFICERS_BY_ALLEGATION_REQUEST_FAILURE,
  RECENT_ACTIVITIES_REQUEST_START,
  RECENT_ACTIVITIES_REQUEST_SUCCESS,
  RECENT_ACTIVITIES_REQUEST_FAILURE,
  NEW_DOCUMENT_ALLEGATIONS_REQUEST_START,
  NEW_DOCUMENT_ALLEGATIONS_REQUEST_SUCCESS,
  NEW_DOCUMENT_ALLEGATIONS_REQUEST_FAILURE,
  COMPLAINT_SUMMARIES_REQUEST_START,
  COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
  COMPLAINT_SUMMARIES_REQUEST_FAILURE,
  TOP_LAWSUITS_REQUEST_START,
  TOP_LAWSUITS_REQUEST_SUCCESS,
  TOP_LAWSUITS_REQUEST_FAILURE,
} from 'actions/landing-page';


describe('landing-page actions', function () {
  describe('requestCMS', function () {
    it('should return right action', function () {
      requestCMS().should.eql({
        types: [
          LANDING_PAGE_CMS_REQUEST_START,
          LANDING_PAGE_CMS_REQUEST_SUCCESS,
          LANDING_PAGE_CMS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(LANDING_PAGE_CMS_API_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });

  describe('requestTopOfficersByAllegation', function () {
    it('should return right action', function () {
      requestTopOfficersByAllegation().should.eql({
        types: [
          TOP_OFFICERS_BY_ALLEGATION_REQUEST_START,
          TOP_OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS,
          TOP_OFFICERS_BY_ALLEGATION_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(TOP_OFFICERS_BY_ALLEGATION_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });

  describe('requestRecentActivities', function () {
    it('should return right action', function () {
      requestRecentActivities().should.eql({
        types: [
          RECENT_ACTIVITIES_REQUEST_START,
          RECENT_ACTIVITIES_REQUEST_SUCCESS,
          RECENT_ACTIVITIES_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(RECENT_ACTIVITIES_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });

  describe('requestNewDocumentAllegations', function () {
    it('should return right action', function () {
      requestNewDocumentAllegations().should.eql({
        types: [
          NEW_DOCUMENT_ALLEGATIONS_REQUEST_START,
          NEW_DOCUMENT_ALLEGATIONS_REQUEST_SUCCESS,
          NEW_DOCUMENT_ALLEGATIONS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(NEW_DOCUMENT_ALLEGATIONS_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });

  describe('requestComplaintSummaries', function () {
    it('should return right action', function () {
      requestComplaintSummaries().should.eql({
        types: [
          COMPLAINT_SUMMARIES_REQUEST_START,
          COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
          COMPLAINT_SUMMARIES_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(COMPLAINT_SUMMARIES_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });

  describe('requestTopLawsuits', function () {
    it('should return right action', function () {
      requestTopLawsuits().should.eql({
        types: [
          TOP_LAWSUITS_REQUEST_START,
          TOP_LAWSUITS_REQUEST_SUCCESS,
          TOP_LAWSUITS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url(TOP_LAWSUITS_ENDPOINT)}`,
            adapter: undefined,
            params: undefined,
          },
        },
      });
    });
  });
});
