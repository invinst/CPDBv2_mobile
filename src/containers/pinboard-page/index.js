import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import { getPinboard, isEmptyPinboardSelector } from 'selectors/pinboard-page/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector } from 'selectors/pinboard-page/geographic-data';
import { getCurrentTab, pinboardPaneSectionRequestingSelector } from 'selectors/pinboard-page/pinboard-pane-section';
import { changePinboardTab, requestCMS } from 'actions/pinboard';
import { getInitialRequested, pinboardPageLoadingSelector } from 'selectors/pinboard-page/pinboard';
import { hasCMS } from 'selectors/common/cms';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  pinboard: getPinboard(state),
  currentTab: getCurrentTab(state),
  hasMapMarker: hasMapMarkersSelector(state),
  initialRequested: getInitialRequested(state),
  pinboardPageLoading: pinboardPageLoadingSelector(state),
  isEmptyPinboard: isEmptyPinboardSelector(state),
  requesting: pinboardPaneSectionRequestingSelector(state),
  hasCMS: hasCMS(state, 'pinboardPage'),
});

const mapDispatchToProps = {
  changePinboardTab,
  pushBreadcrumbs,
  requestCMS,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardPage));
