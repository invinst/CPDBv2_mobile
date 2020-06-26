import { connect } from 'react-redux';

import PinboardDataVisualization from 'components/pinboard-page/pinboard-data-visualization';
import { hasMapMarkersSelector } from 'selectors/pinboard-page/geographic-data';
import { hasComplaintSummarySelector } from 'selectors/pinboard-page/widgets/complaint-summary';


function mapStateToProps(state, ownProps) {
  return {
    hasMapMarker: hasMapMarkersSelector(state),
    hasComplaintSummary: hasComplaintSummarySelector(state),
  };
}

export default connect(mapStateToProps)(PinboardDataVisualization);
