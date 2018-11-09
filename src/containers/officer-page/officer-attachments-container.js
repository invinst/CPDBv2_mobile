import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import { getOfficerTimeline } from 'actions/officer-page/timeline';
import AttachmentsTab from 'components/officer-page/tabbed-pane-section/attachments-tab';
import { complaintsWithAttachmentsSelector } from 'selectors/officer-page/attachments';

function mapStateToProps(state, ownProps) {
  return {
    complaints: complaintsWithAttachmentsSelector(state, ownProps.officerId),
    officerId: ownProps.officerId
  };
}

const mapDispatchToProps = {
  getOfficerTimeline
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttachmentsTab));
