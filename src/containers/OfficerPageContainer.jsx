import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import OfficerPage from 'components/OfficerPage';
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
    loadingSummary: state.officerPage.summaries.isRequesting,
    foundSummary: state.officerPage.summaries.isSuccess,
    summary: officerSummarySelector(state, props),
    pk: pk
  };
}

const mapDispatchToProps = {
  getOfficerSummary
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficerPage));
