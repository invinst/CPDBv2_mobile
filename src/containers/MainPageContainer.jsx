import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import MainPage from 'components/MainPage';
import { suggestTerm } from 'actions/suggestion';


function mapStateToProps(state, ownProps) {
  return {
    urlQuery: ownProps.params.query,
    query: state.suggestionApp.query,
    isSearchFocused: state.suggestionApp.isSearchFocused
  };
}

const mapDispatchToProps = {
  suggestTerm
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
