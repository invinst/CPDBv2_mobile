import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { openShareMenu, closeShareMenu } from 'actions/navbar';
import Navbar from 'components/shared/navbar';


const mapStateToProps = (state, ownProps) => ({
  backLink: ownProps.backLink,
  shareMenuIsOpen: state.navbar.shareMenuIsOpen
});


const mapDispatchToProps = {
  openShareMenu,
  closeShareMenu
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
