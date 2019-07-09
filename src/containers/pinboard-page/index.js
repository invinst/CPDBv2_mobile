import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import { getPinboard, isEmptyPinboardSelector, examplePinboardsSelector } from 'selectors/pinboard-page/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector, getCurrentTab } from 'selectors/pinboard-page/geographic-data';
import { changePinboardTab } from 'actions/pinboard';
import { getInitialRequested } from 'selectors/pinboard-page/pinboard';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  pinboard: getPinboard(state),
  currentTab: getCurrentTab(state),
  hasMapMarker: hasMapMarkersSelector(state),
  initialRequested: getInitialRequested(state),
  isEmptyPinboard: isEmptyPinboardSelector(state),
  examplePinboards: examplePinboardsSelector(state),
});

const mapDispatchToProps = {
  changePinboardTab,
  pushBreadcrumbs,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardPage));
