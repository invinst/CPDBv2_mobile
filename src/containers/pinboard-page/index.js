import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getPinboard, isEmptyPinboardSelector } from 'selectors/pinboard-page/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector } from 'selectors/pinboard-page/geographic-data';
import { requestCMS } from 'actions/pinboard';
import { getInitialRequested, pinboardPageLoadingSelector } from 'selectors/pinboard-page/pinboard';
import { hasCMS } from 'selectors/common/cms';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  params: ownProps.match.params,
  pinboard: getPinboard(state),
  hasMapMarker: hasMapMarkersSelector(state),
  initialRequested: getInitialRequested(state),
  pinboardPageLoading: pinboardPageLoadingSelector(state),
  isEmptyPinboard: isEmptyPinboardSelector(state),
  hasCMS: hasCMS(state, 'pinboardPage'),
});

const mapDispatchToProps = {
  requestCMS,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardPage));
