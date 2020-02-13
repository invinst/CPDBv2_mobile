import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';
import { coaccusalGroupsSelector } from 'selectors/officer-page/coaccusals';


function mapStateToProps(state, ownProps) {
  return {
    coaccusalGroups: coaccusalGroupsSelector(state, ownProps.officerId),
  };
}

const mapDispatchToProps = {
  addOrRemoveItemInPinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coaccusals));
