import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import ComplaintPage from 'components/complaint-page';
import { requestComplaint, requestCMS } from 'actions/complaint-page';
import { trackingClickAttachment } from 'actions/common/analytic';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';
import { complaintSelector, getCMSRequested } from 'selectors/complaint-page';
import { cmsSelector } from 'selectors/common/cms';

const mapStateToProps = (state, ownProps) => ({
  complaintId: ownProps.match.params.complaintId,
  complaint: complaintSelector(state, ownProps),
  pathname: get(ownProps, 'location.pathname'),
  cmsRequested: getCMSRequested(state),
  noAttachmentMessage: cmsSelector(state, 'complaintPage', 'no_attachment_text'),
});

const mapDispatchToProps = {
  requestComplaint,
  onTrackingAttachment: trackingClickAttachment,
  requestCMS,
  addOrRemoveItemInPinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplaintPage));
