import {
  requestReportingPage,
  requestReport,
  REPORTING_PAGE_REQUEST_START,
  REPORTING_PAGE_REQUEST_SUCCESS,
  REPORTING_PAGE_REQUEST_FAILURE,
  REPORT_REQUEST_START,
  REPORT_REQUEST_SUCCESS,
  REPORT_REQUEST_FAILURE
} from 'actions/reporting-page';
import constants from 'constants';
import { v2v2Url } from 'utils/UrlUtil';


describe('reporting page actions', function () {

  describe('requestReportingPage', function () {
    it('should return right action', function () {

      requestReportingPage().should.eql({
        types: [
          REPORTING_PAGE_REQUEST_START,
          REPORTING_PAGE_REQUEST_SUCCESS,
          REPORTING_PAGE_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: v2v2Url(constants.REPORTING_API_ENDPOINT),
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });

  describe('requestReport', function () {
    it('should return right action', function () {

      requestReport(1).should.eql({
        types: [
          REPORT_REQUEST_START,
          REPORT_REQUEST_SUCCESS,
          REPORT_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: v2v2Url(constants.REPORTING_API_ENDPOINT + '1/'),
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });
});
