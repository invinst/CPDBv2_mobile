import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import { getPinboard, isEmptyPinboardSelector } from 'selectors/pinboard-page/pinboard';
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
  updatePinboardInfo
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
  pushBreadcrumbs,
  updatePinboardInfo,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardPage));
