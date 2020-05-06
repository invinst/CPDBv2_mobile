import { connect } from 'react-redux';

import { removeItemInPinboardPage, orderPinboard } from 'actions/pinboard';
import PinnedType from 'components/pinboard-page/pinned-type';
import { pinnedTRRsSelector, getPinnedTRRsRequesting } from 'selectors/pinboard-page/items';
import { getPinboardId } from 'selectors/pinboard-page/pinboard';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    type: 'TRR',
    title: 'TACTICAL RESPONSE REPORTS',
    items: pinnedTRRsSelector(state),
    requesting: getPinnedTRRsRequesting(state),
    pinboardId: getPinboardId(state),
  };
}

const mapDispatchToProps = {
  removeItemInPinboardPage,
  orderPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinnedType);
