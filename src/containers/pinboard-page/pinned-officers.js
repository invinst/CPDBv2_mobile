import { connect } from 'react-redux';

import { removeItemInPinboardPage, orderPinboard } from 'actions/pinboard';
import PinnedType from 'components/pinboard-page/pinned-type';
import { pinnedOfficersSelector, getPinnedOfficersRequesting } from 'selectors/pinboard-page/items';
import { getPinboardId } from 'selectors/pinboard-page/pinboard';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    type: 'OFFICER',
    title: 'OFFICERS',
    items: pinnedOfficersSelector(state),
    requesting: getPinnedOfficersRequesting(state),
    pinboardId: getPinboardId(state),
  };
}

const mapDispatchToProps = {
  removeItemInPinboardPage,
  orderPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinnedType);
