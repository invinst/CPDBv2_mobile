import { connect } from 'react-redux';

import SearchablePage from 'components/Shared/SearchablePage';
import reset from 'actions/suggestion';


function mapStateToProps(state, ownProps) {
  return {
    focus: state.suggestionApp.isSearchFocused
  };
}

const mapDispatchToProps = {
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchablePage);
