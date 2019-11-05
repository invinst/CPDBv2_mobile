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
  officersSelector,
  dateCRsSelector,
  dateTRRsSelector,
  crsSelector,
  trrsSelector,
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
    activeCategory: getActiveCategory(state),
    chosenCategory: getChosenCategory(state),
    recent: recentSuggestionsSelector(state),
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
