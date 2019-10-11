import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import SearchPage from 'components/search-page';
import {
  inputChanged,
  queryChanged,
  suggestTerm,
  suggestAllFromCategory,
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
  officersSelector,
  dateCRsSelector,
  dateTRRsSelector,
  crsSelector,
  trrsSelector,
  suggestedSelector,
  recentSuggestionsSelector,
  dateOfficersSelector,
  investigatorCRsSelector,
  recentSuggestionIdsSelector,
  getRecentSuggestionsRequested,
  nextParamsSelector,
  hasMoreSelector,
} from 'selectors/search-page';
import { getPinboard } from 'selectors/pinboard-page/pinboard';
import { addOrRemoveItemInPinboard, createPinboard } from 'actions/pinboard';
import { getToast } from 'selectors/toast';


function mapStateToProps(state, ownProps) {
  return {
    query: getQuery(state),
    queryPrefix: queryPrefixSelector(state),
    officers: officersSelector(state),
    dateCRs: dateCRsSelector(state),
    investigatorCRs: investigatorCRsSelector(state),
    dateTRRs: dateTRRsSelector(state),
    dateOfficers: dateOfficersSelector(state),
    crs: crsSelector(state),
    trrs: trrsSelector(state),
    suggested: suggestedSelector(state),
    activeCategory: getActiveCategory(state),
    chosenCategory: getChosenCategory(state),
    recent: recentSuggestionsSelector(state),
    recentSuggestionIds: recentSuggestionIdsSelector(state),
    recentSuggestionsRequested: getRecentSuggestionsRequested(state),
    pinboard: getPinboard(state),
    toast: getToast(state),
    nextParams: nextParamsSelector(state),
    hasMore: hasMoreSelector(state),
  };
}

const mapDispatchToProps = {
  inputChanged,
  queryChanged,
  suggestTerm,
  suggestAllFromCategory,
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
