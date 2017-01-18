import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ReportingPage from 'components/ReportingPage';
import { requestReportingPage } from 'actions/reporting-page';
import { hasMoreSelector, nextParamsSelector } from 'selectors/reporting-page';


function mapStateToProps(state, ownProps) {
  return {
    pagination: state.reportingPage.pagination,
    hasMore: hasMoreSelector(state),
    nextParams: nextParamsSelector(state)
  };
}

const mapDispatchToProps = {
  loadMore: requestReportingPage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportingPage));
