import { connect } from 'react-redux';

import ToggleComplaintPage from 'components/ComplaintPage/ToggleComplaintPage';
import { toggleClose } from 'actions/complaint';


const mapDispatchToProps = {
  toggleClose
};

export default connect(null, mapDispatchToProps)(ToggleComplaintPage);
