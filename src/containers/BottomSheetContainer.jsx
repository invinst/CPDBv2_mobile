import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import config from 'config';

import BottomSheet from 'components/BottomSheet';

function mapStateToProps(state, ownProps) {
  return {
    transitionDuration: config.bottomSheet.transitionDuration
  };
}

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BottomSheet));
