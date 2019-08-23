import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ComplaintPage from 'components/complaint-page';
import { requestComplaint, requestCMS } from 'actions/complaint-page';
import { trackingClickAttachment } from 'actions/common/analytic';
import { complaintSelector, getCMSRequested } from 'selectors/complaint-page';
import { cmsSelector } from 'selectors/common/cms';
import { get } from 'lodash';

const mapStateToProps = (state, ownProps) => ({
  complaintId: ownProps.params.complaintId,
  complaint: complaintSelector(state, ownProps),
  pathname: get(ownProps, 'location.pathname'),
  cmsRequested: getCMSRequested(state),
  noAttachmentMessage: cmsSelector(state, 'complaintPage', 'no_attachment_text'),
});

const mapDispatchToProps = {
  requestComplaint,
  onTrackingAttachment: trackingClickAttachment,
  requestCMS,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplaintPage));
