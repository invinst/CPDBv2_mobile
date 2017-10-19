import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SearchPage from 'components/SearchPage';
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
  faqsSelector,
  unitsSelector,
  suggestedSelector,
  recentSelector
} from 'selectors/search-page';


function mapStateToProps(state, ownProps) {
  return {
    query: state.suggestionApp.query,
    officers: officersSelector(state),
    faqs: faqsSelector(state),
    units: unitsSelector(state),
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
