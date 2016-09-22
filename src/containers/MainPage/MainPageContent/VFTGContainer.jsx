import { connect } from 'react-redux';

import VFTG from 'components/MainPage/MainPageContent/VFTG';
import { subscribeEmail, requestLandingPage } from 'actions/vftg';


function mapStateToProps(state, ownProps) {
  return {
    isSearchFocused: state.suggestionApp.isSearchFocused,
    landingPage: state.landingPage.landingPage
  };
}

const mapDispatchToProps = {
  subscribeEmail,
  requestLandingPage
};

export default connect(mapStateToProps, mapDispatchToProps)(VFTG);
