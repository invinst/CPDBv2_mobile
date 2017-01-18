import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import BottomSheet from 'components/BottomSheet';

function mapStateToProps(state, ownProps) {
  return {
  };
}

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BottomSheet));
