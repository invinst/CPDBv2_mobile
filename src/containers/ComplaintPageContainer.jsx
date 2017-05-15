import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ComplaintPage from 'components/ComplaintPage';
import { requestComplaint } from 'actions/complaint-page';
import { complaintSelector } from 'selectors/complaint-page';

const mapStateToProps = (state, ownProps) => {
  const complaintId = Number.parseInt(ownProps.params.complaintId);
  const coaccusedId = Number.parseInt(ownProps.params.coaccusedId);
  return {
    complaintId,
    coaccusedId,
    complaint: complaintSelector(state, ownProps)
  };
};

const mapDispatchToProps = {
  requestComplaint
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplaintPage));
