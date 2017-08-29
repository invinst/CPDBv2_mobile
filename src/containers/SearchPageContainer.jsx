import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SearchPage from 'components/SearchPage';
import {
  inputChanged,
  suggestTerm,
  suggestAllFromCategory,
  saveToRecent,
  updateActiveCategory
} from 'actions/suggestion';
import {
  officersSelector,
  faqsSelector,
  reportsSelector,
  unitsSelector,
  suggestedSelector,
  recentSelector
} from 'selectors/search-page';


function mapStateToProps(state, ownProps) {
  return {
    query: state.suggestionApp.query,
    officers: officersSelector(state),
    faqs: faqsSelector(state),
    reports: reportsSelector(state),
    units: unitsSelector(state),
    recent: recentSelector(state),
    suggested: suggestedSelector(state),
    activeCategory: state.suggestionApp.activeCategory
  };
}

const mapDispatchToProps = {
  inputChanged,
  suggestTerm,
  suggestAllFromCategory,
  saveToRecent,
  updateActiveCategory
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
