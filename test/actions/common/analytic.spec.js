import {
  trackingClickAttachment,
  TRACKING_CLICK_ATTACHMENT_START,
  TRACKING_CLICK_ATTACHMENT_SUCCESS,
  TRACKING_CLICK_ATTACHMENT_FAILURE,
} from 'actions/common/analytic';
import { v2Url } from 'utils/url-util';


describe('analytic actions', function () {
  describe('trackingClickAttachment', function () {
    it('should return right action', function () {
      trackingClickAttachment({ attachmentId: '123456', sourcePage: 'CR Page', app: 'Mobile' }).should.eql({
        types: [
          TRACKING_CLICK_ATTACHMENT_START,
          TRACKING_CLICK_ATTACHMENT_SUCCESS,
          TRACKING_CLICK_ATTACHMENT_FAILURE,
        ],
        payload: {
          request: {
            url: `${v2Url('/attachment-tracking/')}`,
            data: {
              'accessed_from_page': 'CR Page',
              'app': 'Mobile',
              'attachment_id': '123456',
            },
            method: 'POST',
            adapter: undefined,
          },
        },
      });
    });
  });
});
