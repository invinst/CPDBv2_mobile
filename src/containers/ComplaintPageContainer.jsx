import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ComplaintPage from 'components/ComplaintPage';
import { getComplaint } from 'actions/complaint';


function mapStateToProps(state, ownProps) {
  return {
    loading: state.complaintPage.isRequesting,
    found: state.complaintPage.isSuccess,
    toggle: state.complaintPage.toggle,
    complaint: state.complaintPage.complaint,
    crid: ownProps.params.crid
  };
}

const mapDispatchToProps = {
  getComplaint
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplaintPage));
