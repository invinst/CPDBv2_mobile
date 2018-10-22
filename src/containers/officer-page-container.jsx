import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import OfficerPage from 'components/officer-page';
import { fetchOfficer, requestCMS } from 'actions/officer-page';
import {
  officerSummarySelector,
  officerMetricsSelector,
  officerYearlyPercentileSelector,
} from 'selectors/officer-page';
import { cmsSelector, hasCMS } from 'selectors/common/cms';


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
    location: ownProps.location,
    params: ownProps.params,
    loading: state.officerPage.officers.isRequesting,
    found: state.officerPage.officers.isSuccess,
    summary: officerSummarySelector(state, props),
    metrics: officerMetricsSelector(state, props),
    threeCornerPercentile: officerYearlyPercentileSelector(state, props),
    requestOfficerId: pk,
    hasCMS: hasCMS(state, 'officerPage'),
    noDataCMSContent: cmsSelector(state, 'officerPage', 'no_data_explain_text')
  };
}

const mapDispatchToProps = {
  requestCMS,
  fetchOfficer
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficerPage));
