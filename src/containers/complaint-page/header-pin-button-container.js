import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HeaderPinButton from 'components/common/pinboard/header-pin-button';
import { pinnableCrSelector, getIsCrPinned } from 'selectors/complaint-page';
import { showSelectPinboardsSelector } from 'selectors/common/pinboards';
import { fetchPinboard, createPinboard, addOrRemoveItemInPinboard } from 'actions/pinboard';
import { crPinboardsMenuSelector } from 'selectors/complaint-page/pinboards-menu';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    isPinned: getIsCrPinned(state, ownProps),
    item: pinnableCrSelector(state, ownProps),
    showSelectPinboards: showSelectPinboardsSelector(state),
    pinboards: crPinboardsMenuSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  addOrRemoveItemInPinboard,
  createPinboard,
  fetchPinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderPinButton));
