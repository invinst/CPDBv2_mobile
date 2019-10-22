import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import SearchPage from 'components/search-page';
import {
  inputChanged,
  queryChanged,
  suggestTerm,
  saveToRecent,
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
  categoriesSelector,
} from 'selectors/search-page';
import { getPinboard } from 'selectors/pinboard-page/pinboard';
import { addOrRemoveItemInPinboard, createPinboard } from 'actions/pinboard';


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
  };
}

const mapDispatchToProps = {
  inputChanged,
  queryChanged,
  suggestTerm,
  fetchRecentSearchItems,
  fetchedEmptyRecentSearchItems,
  saveToRecent,
  updateActiveCategory,
  updateChosenCategory,
  pushBreadcrumbs,
  addOrRemoveItemInPinboard,
  createPinboard,
  getSuggestionWithContentType,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
