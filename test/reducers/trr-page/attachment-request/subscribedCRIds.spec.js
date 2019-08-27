import subscribedTRRIds from 'reducers/trr-page/attachment-request/subscribed-trr-ids';
import { TRR_REQUEST_DOC_REQUEST_SUCCESS } from 'actions/trr-page';


describe('AttachmentRequest reducer', function () {
  describe('subscribedTRRIds', function () {
    it('should have initial state', function () {
      subscribedTRRIds(undefined, {}).should.eql({});
    });

    it('should handle TRR_REQUEST_DOC_REQUEST_SUCCESS', function () {
      subscribedTRRIds(undefined, {
        type: TRR_REQUEST_DOC_REQUEST_SUCCESS,
        payload: {
          'trr_id': 12,
          message: 'Dummy message',
        },
      }).should.be.eql({ 12: true });

      subscribedTRRIds({ 13: true }, {
        type: TRR_REQUEST_DOC_REQUEST_SUCCESS,
        payload: {
          'trr_id': 12,
          message: 'Dummy message',
        },
      }).should.be.eql({ 12: true, 13: true });
    });
  });
});
