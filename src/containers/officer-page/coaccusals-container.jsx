import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import { coaccusalGroupsSelector } from 'selectors/officer-page/coaccusals';
import { getOfficerCoaccusals } from 'actions/officer-page/coaccusals';


function mapStateToProps(state, ownProps) {
  return {
    coaccusalGroups: coaccusalGroupsSelector(state, ownProps.officerId),
    officerId: ownProps.officerId
  };
}

const mapDispatchToProps = {
  getOfficerCoaccusals,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coaccusals));
