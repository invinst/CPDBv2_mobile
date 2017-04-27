import {
  requestFAQPage,
  requestFAQ,
  FAQ_PAGE_REQUEST_START,
  FAQ_PAGE_REQUEST_SUCCESS,
  FAQ_PAGE_REQUEST_FAILURE,
  FAQ_REQUEST_START,
  FAQ_REQUEST_SUCCESS,
  FAQ_REQUEST_FAILURE
} from 'actions/faq-page';
import constants from 'constants';
import { v2Url } from 'utils/UrlUtil';


describe('faq page actions', function () {

  describe('requestFAQPage', function () {
    it('should return right action', function () {

      requestFAQPage().should.eql({
        types: [
          FAQ_PAGE_REQUEST_START,
          FAQ_PAGE_REQUEST_SUCCESS,
          FAQ_PAGE_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: v2Url(constants.FAQ_API_ENDPOINT),
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });

  describe('requestFAQ', function () {
    it('should return right action', function () {

      requestFAQ(1).should.eql({
        types: [
          FAQ_REQUEST_START,
          FAQ_REQUEST_SUCCESS,
          FAQ_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: v2Url(constants.FAQ_API_ENDPOINT + '1/'),
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });
});
