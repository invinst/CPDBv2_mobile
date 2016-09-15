import { connect } from 'react-redux';

import OfficerAllegationItem from 'components/Shared/OfficerAllegationItem';
import { reset } from 'actions/suggestion';


const mapDispatchToProps = {
  reset
};

export default connect(null, mapDispatchToProps)(OfficerAllegationItem);
