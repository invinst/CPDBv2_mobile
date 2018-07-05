import message from 'reducers/complaint-page/attachment-request/message';
import {
  COMPLAINT_REQUEST_DOC_REQUEST_START,
  COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS,
  COMPLAINT_REQUEST_DOC_REQUEST_FAILURE
} from 'actions/complaint-page';


describe('AttachmentRequest reducer', function () {
  describe('request reducer', function () {
    it('should have initial state', function () {
      message(undefined, {}).should.eql('');
    });

    it('should handle COMPLAINT_REQUEST_DOC_REQUEST_START', function () {
      message('', {
        type: COMPLAINT_REQUEST_DOC_REQUEST_START,
        email: 'valid@email.com'
      }).should.eql('');
    });

    it('should handle COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS', function () {
      message('', {
        type: COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS,
        payload: {
          message: 'Thanks for subscribing'
        }
      }).should.eql('Thanks for subscribing');
    });

    it('should handle COMPLAINT_REQUEST_DOC_REQUEST_FAILURE', function () {
      message('', {
        type: COMPLAINT_REQUEST_DOC_REQUEST_FAILURE,
        payload: {
          message: 'Not subscribe'
        }
      }).should.eql('Not subscribe');
    });
  });
});
