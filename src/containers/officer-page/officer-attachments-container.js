import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AttachmentsTab from 'components/officer-page/tabbed-pane-section/attachments-tab';
import { complaintsWithAttachmentsSelector, lawsuitsWithAttachmentsSelector } from 'selectors/officer-page/attachments';
import { trackingClickAttachment } from 'actions/common/analytic';

function mapStateToProps(state, ownProps) {
  return {
    complaints: complaintsWithAttachmentsSelector(state, ownProps.officerId),
    lawsuits: lawsuitsWithAttachmentsSelector(state, ownProps.officerId),
    officerId: ownProps.officerId,
  };
}

const mapDispatchToProps = {
  onTrackingAttachment: trackingClickAttachment,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttachmentsTab));
