import subscribedCRIds from 'reducers/complaint-page/attachment-request/subscribed-crids';
import { COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS } from 'actions/complaint-page';


describe('AttachmentRequest reducer', function () {
  describe('subscribedCRIds', function () {
    it('should have initial state', function () {
      subscribedCRIds(undefined, {}).should.eql({});
    });

    it('should handle COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS', function () {
      subscribedCRIds(undefined, {
        type: COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS,
        payload: {
          crid: 12,
          message: 'Dummy message',
        },
      }).should.be.eql({ 12: true });

      subscribedCRIds({ 13: true }, {
        type: COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS,
        payload: {
          crid: 12,
          message: 'Dummy message',
        },
      }).should.be.eql({ 12: true, 13: true });
    });
  });
});
