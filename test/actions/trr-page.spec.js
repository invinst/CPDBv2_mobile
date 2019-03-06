import {
  requestTRR,
  requestDocument,
  requestCMS,
  TRR_REQUEST_START,
  TRR_REQUEST_SUCCESS,
  TRR_REQUEST_FAILURE,
  TRR_REQUEST_DOC_REQUEST_FAILURE,
  TRR_REQUEST_DOC_REQUEST_START,
  TRR_REQUEST_DOC_REQUEST_SUCCESS,
  TRR_PAGE_CMS_REQUEST_FAILURE,
  TRR_PAGE_CMS_REQUEST_START,
  TRR_PAGE_CMS_REQUEST_SUCCESS,
} from 'actions/trr-page';
import constants from 'constants';
import { v2Url } from 'utils/url-util';


describe('trr-page actions', function () {
  describe('requestTRR', function () {
    it('should return right action', function () {

      requestTRR(11).should.eql({
        types: [TRR_REQUEST_START, TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE],
        meta: { id: 11 },
        payload: {
          request: {
            url: `${v2Url(constants.TRR_API_ENDPOINT)}11/`,
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });
  describe('requestDocument', function () {
    it('shoulr return right action', function () {
      requestDocument({ id: 123, email: 'valid@email.com' }).should.eql({
        types: [
          TRR_REQUEST_DOC_REQUEST_START,
          TRR_REQUEST_DOC_REQUEST_SUCCESS,
          TRR_REQUEST_DOC_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: `${v2Url(constants.TRR_API_ENDPOINT)}123/request-document/`,
            data: {
              email: 'valid@email.com'
            },
            method: 'POST',
            adapter: undefined
          }
        }
      });
    });
  });

  describe('requestCMS', function () {
    it('should return right action', function () {
      requestCMS().should.eql({
        types: [
          TRR_PAGE_CMS_REQUEST_START,
          TRR_PAGE_CMS_REQUEST_SUCCESS,
          TRR_PAGE_CMS_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: `${v2Url(constants.TRR_PAGE_CMS_API_ENDPOINT)}`,
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });
});
