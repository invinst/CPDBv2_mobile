import { connect } from 'react-redux';

import { getPinboard } from 'selectors/pinboard';
import { fetchPinboard } from 'actions/pinboard';
import PinboardPage from 'components/pinboard-page';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
  };
}

const mapDispatchToProps = {
  fetchPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardPage);
