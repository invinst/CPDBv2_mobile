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
} from 'actions/suggestion';
import {
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
} from 'selectors/search-page';
import { getPinboard } from 'selectors/pinboard-page/pinboard';
import { addOrRemoveItemInPinboard, createPinboard } from 'actions/pinboard';
import { getToast } from 'selectors/toast';


function mapStateToProps(state, ownProps) {
  return {
    query: state.suggestionApp.query,
    officers: officersSelector(state),
    dateCRs: dateCRsSelector(state),
    investigatorCRs: investigatorCRsSelector(state),
    dateTRRs: dateTRRsSelector(state),
    dateOfficers: dateOfficersSelector(state),
    crs: crsSelector(state),
    trrs: trrsSelector(state),
    suggested: suggestedSelector(state),
    recent: recentSuggestionsSelector(state),
    recentSuggestionIds: recentSuggestionIdsSelector(state),
    recentSuggestionsRequested: getRecentSuggestionsRequested(state),
    activeCategory: state.suggestionApp.activeCategory,
    chosenCategory: state.suggestionApp.chosenCategory,
    pinboard: getPinboard(state),
    toast: getToast(state),
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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
