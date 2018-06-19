import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import OfficerSummary from 'components/officer-page/officer-summary';
import { getOfficerSummary, fetchOfficer } from 'actions/officer';
import { officerSummarySelector, officerYearlyPercentileSelector } from 'selectors/officer-page';


function mapStateToProps(state, ownProps) {
  const pk = Number.parseInt(ownProps.params.id);
  const props = {
    ...ownProps,
    params: {
      ...ownProps.params,
      id: pk
    }
  };
  return {
    loading: state.officerPage.summaries.isRequesting || state.officerPage.officers.isRequesting,
    found: state.officerPage.summaries.isSuccess,
    summary: officerSummarySelector(state, props),
    threeCornerPercentile: officerYearlyPercentileSelector(state, props),
    pk: pk
  };
}

const mapDispatchToProps = {
  getOfficerSummary,
  fetchOfficer
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficerSummary));
