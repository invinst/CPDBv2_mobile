import {
  requestComplaint,
  requestDocument,
  COMPLAINT_REQUEST_START,
  COMPLAINT_REQUEST_SUCCESS,
  COMPLAINT_REQUEST_FAILURE,
  COMPLAINT_REQUEST_DOC_REQUEST_START,
  COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS,
  COMPLAINT_REQUEST_DOC_REQUEST_FAILURE
} from 'actions/complaint-page';
import constants from 'constants';
import { v2Url } from 'utils/url-util';


describe('ComplaintPage actions', function () {
  describe('requestComplaint', function () {
    it('should return the right action', function () {
      requestComplaint(123).should.eql({
        meta: { id: 123 },
        types: [COMPLAINT_REQUEST_START, COMPLAINT_REQUEST_SUCCESS, COMPLAINT_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${v2Url(constants.COMPLAINT_API_ENDPOINT)}123/`,
            params: undefined,
            adapter: undefined
          }
        }
      });
    });
  });

  describe('requestDocument', function () {
    it('shoulr return right action', function () {
      requestDocument({ id: 123, email: 'valid@email.com' }).should.eql({
        types: [
          COMPLAINT_REQUEST_DOC_REQUEST_START,
          COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS,
          COMPLAINT_REQUEST_DOC_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: `${v2Url(constants.COMPLAINT_API_ENDPOINT)}123/request-document/`,
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
});
