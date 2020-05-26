import { connect } from 'react-redux';

import { pinboardsSelector } from 'selectors/pinboard-page/pinboards';
import { getPinboard } from 'selectors/pinboard-page/pinboard';
import Pinboards from 'components/pinboard-page/pinboards';
import { createNewEmptyPinboard, duplicatePinboard, fetchPinboards } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboards: pinboardsSelector(state),
    pinboard: getPinboard(state),
  };
}

const mapDispatchToProps = {
  fetchPinboards,
  createNewEmptyPinboard,
  duplicatePinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pinboards);
