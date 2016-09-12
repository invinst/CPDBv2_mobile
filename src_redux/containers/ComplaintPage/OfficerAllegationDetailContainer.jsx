import { connect } from 'react-redux';

import OfficerAllegationDetail from 'components/ComplaintPage/OfficerAllegationDetail';
import { toggleOpen } from 'actions/complaint';


const mapDispatchToProps = {
  toggleOpen
};

export default connect(null, mapDispatchToProps)(OfficerAllegationDetail);
