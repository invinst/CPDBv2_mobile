import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import OfficerPage from 'components/officer-page';
import { fetchOfficer } from 'actions/officer';
import {
  officerSummarySelector,
  officerMetricsSelector,
  officerYearlyPercentileSelector
} from 'selectors/officer-page';


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
    loading: state.officerPage.officers.isRequesting,
    found: state.officerPage.officers.isSuccess,
    summary: officerSummarySelector(state, props),
    metrics: officerMetricsSelector(state, props),
    threeCornerPercentile: officerYearlyPercentileSelector(state, props),
    pk: pk
  };
}

const mapDispatchToProps = {
  fetchOfficer
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficerPage));
