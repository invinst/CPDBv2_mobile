import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import OfficerSummary from 'components/officer-page/officer-summary';
import { getOfficerSummary } from 'actions/officer';
import { officerSummarySelector } from 'selectors/officer-page';


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
    loading: state.officerPage.summaries.isRequesting,
    found: state.officerPage.summaries.isSuccess,
    summary: officerSummarySelector(state, props),
    pk: pk
  };
}

const mapDispatchToProps = {
  getOfficerSummary
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficerSummary));
