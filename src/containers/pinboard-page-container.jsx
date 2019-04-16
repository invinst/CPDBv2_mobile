import { connect } from 'react-redux';

import { getPinboard, getPinboardItems } from 'selectors/pinboard';
import {
  fetchPinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  removeItemInPinboardPage,
} from 'actions/pinboard';
import PinboardPage from 'components/pinboard-page';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
    itemsByTypes: getPinboardItems(state),
  };
}

const mapDispatchToProps = {
  fetchPinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  removeItemInPinboardPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardPage);
