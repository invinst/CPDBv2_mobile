import { connect } from 'react-redux';

import SearchPage from 'components/SearchPage';
import {
  inputChanged,
  suggestTerm,
  suggestAllFromCategory,
  saveToRecent
} from 'actions/suggestion';
import {
  officersSelector,
  faqsSelector,
  reportsSelector,
  suggestedSelector,
  recentSelector
} from 'selectors/search-page';


function mapStateToProps(state, ownProps) {
  return {
    query: state.suggestionApp.query,
    officers: officersSelector(state),
    faqs: faqsSelector(state),
    reports: reportsSelector(state),
    recent: recentSelector(state),
    suggested: suggestedSelector(state)
  };
}

const mapDispatchToProps = {
  inputChanged,
  suggestTerm,
  suggestAllFromCategory,
  saveToRecent
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
