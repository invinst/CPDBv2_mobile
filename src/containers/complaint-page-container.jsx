import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ComplaintPage from 'components/complaint-page';
import { requestComplaint } from 'actions/complaint-page';
import { complaintSelector } from 'selectors/complaint-page';

const mapStateToProps = (state, ownProps) => ({
  complaintId: ownProps.params.complaintId,
  complaint: complaintSelector(state, ownProps)
});

const mapDispatchToProps = {
  requestComplaint
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplaintPage));
