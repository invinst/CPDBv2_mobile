import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import OfficerPage from 'components/OfficerPage';
import { suggestTerm } from 'actions/suggestion';
import { getOfficer } from 'actions/officer';


function mapStateToProps(state, ownProps) {
  return {
  	loading: state.officerPage.isRequesting,
  	found: state.officerPage.isSuccess,
  	officer: state.officerPage.officer,
    pk: ownProps.params.id
  };
}

const mapDispatchToProps = {
  getOfficer
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfficerPage));
