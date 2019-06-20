import { connect } from 'react-redux';

import { graphDataSelector, getRequesting } from 'selectors/pinboard-page/social-graph';
import { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';

function mapStateToProps(state, ownProps) {
  return {
    requesting: getRequesting(state),
    officers: graphDataSelector(state).officers,
    coaccusedData: graphDataSelector(state).coaccusedData,
    listEvent: graphDataSelector(state).listEvent,
  };
}

export default connect(mapStateToProps)(AnimatedSocialGraphWithSpinner);
