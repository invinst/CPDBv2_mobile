import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { get } from 'lodash';

import TimeLine from 'components/officer-page/tabbed-pane-section/timeline';
import { getNewTimelineItems, filterCount } from 'selectors/officer-page/timeline';
import { trackingClickAttachment } from 'actions/common/analytic';
import { changeFilter } from 'actions/officer-page/timeline';


function mapStateToProps(state, ownProps) {
  return {
    items: getNewTimelineItems(state, ownProps),
    pathname: get(ownProps, 'location.pathname'),
    filterCount: filterCount(state, ownProps),
  };
}

const mapDispatchToProps = {
  onTrackingAttachment: trackingClickAttachment,
  changeFilter,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeLine));
