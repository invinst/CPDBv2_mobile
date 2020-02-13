import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import TimeLine from 'components/officer-page/tabbed-pane-section/timeline';
import { timelineItemsSelector, filterCountSelector, getSelectedFilter } from 'selectors/officer-page/timeline';
import { trackingClickAttachment } from 'actions/common/analytic';
import { changeFilter } from 'actions/officer-page/timeline';


function mapStateToProps(state, ownProps) {
  return {
    items: timelineItemsSelector(state, ownProps),
    pathname: get(ownProps, 'location.pathname'),
    filterCount: filterCountSelector(state, ownProps),
    selectedFilter: getSelectedFilter(state),
  };
}

const mapDispatchToProps = {
  onTrackingAttachment: trackingClickAttachment,
  changeFilter,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeLine));
