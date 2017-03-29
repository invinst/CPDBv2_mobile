import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { routeChanged } from 'actions/navigation';
import MainPage from 'components/MainPage';
import { fetchSuggestedSearchItems } from 'actions/suggestion';


function mapStateToProps(state, ownProps) {
  return {
    urlQuery: ownProps.params.query,
    query: state.suggestionApp.query,
    isSearchFocused: state.suggestionApp.isSearchFocused
  };
}

const mapDispatchToProps = {
  fetchSuggestedSearchItems,
  routeChanged
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
