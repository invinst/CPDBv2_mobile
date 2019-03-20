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
  updateChosenCategory
} from 'actions/suggestion';
import {
  officersSelector,
  dateCRsSelector,
  dateTRRsSelector,
  crsSelector,
  trrsSelector,
  suggestedSelector,
  recentSelector,
  dateOfficersSelector,
  investigatorCRsSelector
} from 'selectors/search-page';
import { getPinboard } from 'selectors/pinboard';
import { addItemToPinboard } from 'actions/pinboard';


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
    recent: recentSelector(state),
    suggested: suggestedSelector(state),
    activeCategory: state.suggestionApp.activeCategory,
    chosenCategory: state.suggestionApp.chosenCategory,
    pinboard: getPinboard(state),
  };
}

const mapDispatchToProps = {
  inputChanged,
  queryChanged,
  suggestTerm,
  suggestAllFromCategory,
  saveToRecent,
  updateActiveCategory,
  updateChosenCategory,
  pushBreadcrumbs,
  addItemToPinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
