import { connect } from 'react-redux';

import SearchResults from 'components/Shared/SearchablePage/SearchResults';
import { focus, blur, clear, inputChanged, suggestTerm } from 'actions/suggestion';


function mapStateToProps(state, ownProps) {
  return {
    isRequesting: state.suggestionApp.isRequesting,
    query: state.suggestionApp.query,
    suggestions: state.suggestionApp.suggestions,
    isSuccess: state.suggestionApp.isSuccess,
    isSearchFocused: state.suggestionApp.isSearchFocused
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
