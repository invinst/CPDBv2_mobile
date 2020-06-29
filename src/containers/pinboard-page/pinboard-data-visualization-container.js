import { connect } from 'react-redux';

import PinboardDataVisualization from 'components/pinboard-page/pinboard-data-visualization';
import { hasMapMarkersSelector } from 'selectors/pinboard-page/geographic-data';
import { hasComplaintSummarySelector } from 'selectors/pinboard-page/widgets/complaint-summary';
import { hasTRRSummarySelector } from 'selectors/pinboard-page/widgets/trr-summary';
import { hasOfficersSummarySelector } from 'selectors/pinboard-page/widgets/officers-summary';


function mapStateToProps(state, ownProps) {
  return {
    hasMapMarker: hasMapMarkersSelector(state),
    hasComplaintSummary: hasComplaintSummarySelector(state),
    hasTRRSummary: hasTRRSummarySelector(state),
    hasOfficersSummary: hasOfficersSummarySelector(state),
  };
}

export default connect(mapStateToProps)(PinboardDataVisualization);
