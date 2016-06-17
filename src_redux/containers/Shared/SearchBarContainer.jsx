import { connect } from 'react-redux';

import SearchBar from 'components/Shared/SearchablePage/SearchBar';
import { focus, blur, clear, inputChanged, suggestTerm } from 'actions/suggestion';


function mapStateToProps(state, ownProps) {
  return {
    query: state.suggestionApp.query,
    isSearchFocused: state.suggestionApp.isSearchFocused
  };
}

const mapDispatchToProps = {
  focus,
  blur,
  clear,
  inputChanged,
  suggestTerm
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
