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
  recentSelector,
  dateOfficersSelector,
  investigatorCRsSelector,
} from 'selectors/search-page';


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
    recent: recentSelector(state),
    suggested: suggestedSelector(state),
    activeCategory: getActiveCategory(state),
    chosenCategory: getChosenCategory(state),
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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
