import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TimeLine from 'components/officer-page/tabbed-pane-section/timeline';
import { getNewTimelineItems } from 'selectors/officer-page/timeline';
import { get } from 'lodash';


function mapStateToProps(state, ownProps) {
  return {
    items: getNewTimelineItems(state, ownProps.officerId),
    pathname: get(ownProps, 'location.pathname'),
  };
}


export default withRouter(connect(mapStateToProps)(TimeLine));
