import { connect } from 'react-redux';

import { getPinboard, isEmptyPinboardSelector } from 'selectors/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector, getCurrentTab } from 'selectors/pinboard-page/geographic-data';
import {
  changePinboardTab,
  fetchPinboard,
  fetchPinboardGeographicData,
  fetchPinboardSocialGraph,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
} from 'actions/pinboard';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  pinboard: getPinboard(state),
  currentTab: getCurrentTab(state),
  hasMapMarker: hasMapMarkersSelector(state),
  isEmptyPinboard: isEmptyPinboardSelector(state),
});

const mapDispatchToProps = {
  fetchPinboard,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
  changePinboardTab,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardPage);
