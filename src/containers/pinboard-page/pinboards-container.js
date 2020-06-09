import { connect } from 'react-redux';

import { pinboardsSelector } from 'selectors/pinboard-page/pinboards';
import Pinboards from 'components/pinboard-page/pinboards';
import { createNewEmptyPinboard, duplicatePinboard } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboards: pinboardsSelector(state),
  };
}

const mapDispatchToProps = {
  createNewEmptyPinboard,
  duplicatePinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pinboards);
