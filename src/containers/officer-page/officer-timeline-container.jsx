import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TimeLine from 'components/officer-page/tabbed-pane-section/timeline';
import { getNewTimelineItems } from 'selectors/officer-page/timeline';
import { getOfficerTimeline } from 'actions/officer-page/timeline';


function mapStateToProps(state, ownProps) {
  return {
    items: getNewTimelineItems(state),
    officerId: Number.parseInt(ownProps.params.id)
  };
}

const mapDispatchToProps = {
  getOfficerTimeline,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeLine));
