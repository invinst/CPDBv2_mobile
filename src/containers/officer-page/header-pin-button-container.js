import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HeaderPinButton from 'components/common/pinboard/header-pin-button';
import { getIsOfficerPinned, pinnableOfficerSelector } from 'selectors/officer-page';
import { showSelectPinboardsSelector } from 'selectors/common/pinboards';
import { fetchPinboard, createPinboard, addOrRemoveItemInPinboard } from 'actions/pinboard';
import { officerPinboardsMenuSelector } from 'selectors/officer-page/pinboards-menu';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    isPinned: getIsOfficerPinned(state, ownProps),
    item: pinnableOfficerSelector(state, ownProps),
    showSelectPinboards: showSelectPinboardsSelector(state),
    pinboards: officerPinboardsMenuSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  addOrRemoveItemInPinboard,
  createPinboard,
  fetchPinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderPinButton));
