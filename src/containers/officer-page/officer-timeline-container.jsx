import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import OfficerTimeline from 'components/officer-page/officer-timeline';

import {
  getOfficerTimeline,
  getMoreOfficerTimeline,
  getOfficerSummary
} from 'actions/officer';

import {
  officerTimelineSelector,
  hasMoreOfficerTimelineSelector,
  officerSummarySelector
} from 'selectors/officer-page';


function mapStateToProps(state, ownProps) {
  const pk = Number.parseInt(ownProps.params.id);
  const props = {
    ...ownProps,
    params: {
      ...ownProps.params,
      id: pk
    }
  };

  return {
    loading: state.officerPage.timelines.isRequesting,
    found: state.officerPage.timelines.isSuccess,
    timeline: officerTimelineSelector(state, props),
    hasMore: hasMoreOfficerTimelineSelector(state, props),
    summary: officerSummarySelector(state, props),
    pk: pk
  };
}

const mapDispatchToProps = {
  getOfficerTimeline,
  getMoreOfficerTimeline,
  getOfficerSummary
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficerTimeline));
