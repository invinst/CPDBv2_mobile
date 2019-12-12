import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AllegationsMap from 'components/common/allegations-map';
import {
  mapLegendSelector,
  mapMarkerGroupsSelector,
  getClearAllMarkers,
} from 'selectors/pinboard-page/geographic-data';

function mapStateToProps(state, ownProps) {
  return {
    mapCustomClassName: 'pinboard-map',
    legend: mapLegendSelector(state),
    markerGroups: mapMarkerGroupsSelector(state),
    clearAllMarkers: getClearAllMarkers(state),
  };
}

export default withRouter(connect(mapStateToProps)(AllegationsMap));
