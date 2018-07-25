import message from 'reducers/trr-page/attachment-request/message';
import {
  TRR_REQUEST_DOC_REQUEST_START,
  TRR_REQUEST_DOC_REQUEST_SUCCESS,
  TRR_REQUEST_DOC_REQUEST_FAILURE
} from 'actions/trr-page';


describe('AttachmentRequest reducer', function () {
  describe('request reducer', function () {
    it('should have initial state', function () {
      message(undefined, {}).should.eql('');
    });

    it('should handle TRR_REQUEST_DOC_REQUEST_START', function () {
      message('', {
        type: TRR_REQUEST_DOC_REQUEST_START,
        email: 'valid@email.com'
      }).should.eql('');
    });

    it('should handle TRR_REQUEST_DOC_REQUEST_SUCCESS', function () {
      message('', {
        type: TRR_REQUEST_DOC_REQUEST_SUCCESS,
        payload: {
          message: 'Thanks for subscribing'
        }
      }).should.eql('Thanks for subscribing');
    });

    it('should handle TRR_REQUEST_DOC_REQUEST_FAILURE', function () {
      message('', {
        type: TRR_REQUEST_DOC_REQUEST_FAILURE,
        payload: {
          message: 'Not subscribe'
        }
      }).should.eql('Not subscribe');
    });
  });
});
