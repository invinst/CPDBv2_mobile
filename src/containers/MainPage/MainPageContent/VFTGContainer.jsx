import { connect } from 'react-redux';;

import VFTG from 'components/MainPage/MainPageContent/VFTG';
import { subscribeEmail } from 'actions/vftg';


function mapStateToProps(state, ownProps) {
  return {
    isSearchFocused: state.suggestionApp.isSearchFocused,
  };
}

const mapDispatchToProps = {
  subscribeEmail
};

export default connect(mapStateToProps, mapDispatchToProps)(VFTG);
