import { connect } from 'react-redux';

import { getPinboard } from 'selectors/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector, getCurrentTab } from 'selectors/pinboard-page/geographic-data';
import { fetchPinboard, fetchPinboardSocialGraph } from 'actions/pinboard';
import { changePinboardTab, fetchPinboardGeographicData } from 'actions/pinboard';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  pinboard: getPinboard(state),
  currentTab: getCurrentTab(state),
  hasMapMarker: hasMapMarkersSelector(state),
});

const mapDispatchToProps = {
  fetchPinboard,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
  changePinboardTab
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardPage);
