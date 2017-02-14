import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ReportingDetail from 'components/ReportingPage/ReportingDetail';
import { requestReport } from 'actions/reporting-page';


function mapStateToProps(state, ownProps) {
  const id = Number(ownProps.params.id);
  const currentReportDetail = state.reportingPage.detail;

  return {
    id: id,
    report: currentReportDetail
  };
}

const mapDispatchToProps = {
  requestReport
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportingDetail));
