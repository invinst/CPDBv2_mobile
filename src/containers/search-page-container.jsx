import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SearchPage from 'components/search-page';
import {
  inputChanged,
  queryChanged,
  suggestTerm,
  updateActiveCategory,
  updateChosenCategory,
  fetchRecentSearchItems,
  fetchedEmptyRecentSearchItems,
  getSuggestionWithContentType,
} from 'actions/suggestion';
import {
  getQuery,
  queryPrefixSelector,
  getChosenCategory,
  getActiveCategory,
  recentSuggestionIdsSelector,
  getRecentSuggestionsRequested,
  nextParamsSelector,
  hasMoreSelector,
  getCancelPathname,
  categoriesSelector,
} from 'selectors/search-page';
import { getPinboard } from 'selectors/pinboard-page/pinboard';
import { createPinboard } from 'actions/pinboard';
import { visitPinboardIntroduction } from 'actions/pinboard-introduction';
import { isPinboardIntroductionVisitedSelector } from 'selectors/pinboard-introduction';


function mapStateToProps(state, ownProps) {
  return {
    query: getQuery(state),
    queryPrefix: queryPrefixSelector(state),
    categories: categoriesSelector(state),
    activeCategory: getActiveCategory(state),
    chosenCategory: getChosenCategory(state),
    recentSuggestionIds: recentSuggestionIdsSelector(state),
    recentSuggestionsRequested: getRecentSuggestionsRequested(state),
    pinboard: getPinboard(state),
    nextParams: nextParamsSelector(state),
    hasMore: hasMoreSelector(state),
    cancelPathname: getCancelPathname(state),
    isPinboardIntroductionVisited: isPinboardIntroductionVisitedSelector(state),
  };
}

const mapDispatchToProps = {
  inputChanged,
  queryChanged,
  suggestTerm,
  fetchRecentSearchItems,
  fetchedEmptyRecentSearchItems,
  updateActiveCategory,
  updateChosenCategory,
  createPinboard,
  getSuggestionWithContentType,
  visitPinboardIntroduction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
