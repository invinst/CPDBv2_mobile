import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AllegationsMapWithSpinner } from 'components/common/allegations-map';
import {
  mapLegendSelector,
  mapMarkerGroupsSelector,
  geographicDataRequestingSelector,
  getClearAllMarkers,
} from 'selectors/pinboard-page/geographic-data';

function mapStateToProps(state, ownProps) {
  return {
    mapCustomClassName: 'pinboard-map',
    legend: mapLegendSelector(state),
    markerGroups: mapMarkerGroupsSelector(state),
    clearAllMarkers: getClearAllMarkers(state),
    requesting: geographicDataRequestingSelector(state),
  };
}

export default withRouter(connect(mapStateToProps)(AllegationsMapWithSpinner));
