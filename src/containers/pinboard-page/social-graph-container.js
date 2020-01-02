import { connect } from 'react-redux';

import { graphDataSelector, getSocialGraphRequesting } from 'selectors/pinboard-page/social-graph';
import { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';

function mapStateToProps(state, ownProps) {
  return {
    officers: graphDataSelector(state).officers,
    coaccusedData: graphDataSelector(state).coaccusedData,
    listEvent: graphDataSelector(state).listEvent,
    requesting: getSocialGraphRequesting(state),
  };
}

export default connect(mapStateToProps)(AnimatedSocialGraphWithSpinner);
