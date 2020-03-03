import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { routeChanged } from 'actions/navigation';
import App from 'components/app';


function mapStateToProps(state, ownProps) {
  return {
    query: state.suggestionApp.query,
    isSearchFocused: state.suggestionApp.isSearchFocused,
  };
}

const mapDispatchToProps = {
  routeChanged,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
