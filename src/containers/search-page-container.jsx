import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SearchPage from 'components/search-page';
import {
  inputChanged,
  suggestTerm,
  suggestAllFromCategory,
  saveToRecent,
  updateActiveCategory,
  updateChosenCategory
} from 'actions/suggestion';
import {
  officersSelector,
  crsSelector,
  trrsSelector,
  suggestedSelector,
  recentSelector
} from 'selectors/search-page';


function mapStateToProps(state, ownProps) {
  return {
    query: state.suggestionApp.query,
    officers: officersSelector(state),
    crs: crsSelector(state),
    trrs: trrsSelector(state),
    recent: recentSelector(state),
    suggested: suggestedSelector(state),
    activeCategory: state.suggestionApp.activeCategory,
    chosenCategory: state.suggestionApp.chosenCategory
  };
}

const mapDispatchToProps = {
  inputChanged,
  suggestTerm,
  suggestAllFromCategory,
  saveToRecent,
  updateActiveCategory,
  updateChosenCategory,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
