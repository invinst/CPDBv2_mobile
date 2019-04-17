import { connect } from 'react-redux';

import { getPinboard } from 'selectors/pinboard';
import { graphDataSelector } from 'selectors/pinboard-page/social-graph';
import PinboardPage from 'components/pinboard-page';
import { fetchPinboard, fetchPinboardSocialGraph } from 'actions/pinboard';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  pinboard: getPinboard(state),
  graphData: graphDataSelector(state),
});

const mapDispatchToProps = {
  fetchPinboard,
  fetchPinboardSocialGraph,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardPage);
