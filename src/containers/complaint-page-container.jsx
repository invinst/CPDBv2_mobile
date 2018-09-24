import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ComplaintPage from 'components/complaint-page';
import { requestComplaint } from 'actions/complaint-page';
import { complaintSelector } from 'selectors/complaint-page';
import { get } from 'lodash';

const mapStateToProps = (state, ownProps) => ({
  complaintId: ownProps.params.complaintId,
  complaint: complaintSelector(state, ownProps),
  pathname: get(ownProps, 'location.pathname'),
});

const mapDispatchToProps = {
  requestComplaint
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplaintPage));
