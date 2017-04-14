import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import config from 'config';

import BottomSheet from 'components/BottomSheet';

const mapStateToProps = (state, ownProps) => ({
  transitionDuration: config.bottomSheet.transitionDuration,
  location: ownProps.location
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BottomSheet));
