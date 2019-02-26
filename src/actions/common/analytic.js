import { post } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';

export const TRACKING_CLICK_ATTACHMENT_START = 'TRACKING_CLICK_ATTACHMENT_START';
export const TRACKING_CLICK_ATTACHMENT_SUCCESS = 'TRACKING_CLICK_ATTACHMENT_SUCCESS';
export const TRACKING_CLICK_ATTACHMENT_FAILURE = 'TRACKING_CLICK_ATTACHMENT_FAILURE';

export const trackingClickAttachment = ({ attachmentId, sourcePage, app }) => post(
  `${v2Url('/attachment-tracking/')}`,
  [TRACKING_CLICK_ATTACHMENT_START, TRACKING_CLICK_ATTACHMENT_SUCCESS, TRACKING_CLICK_ATTACHMENT_FAILURE]
)({ 'accessed_from_page': sourcePage, 'app': app, 'attachment_id': attachmentId });
