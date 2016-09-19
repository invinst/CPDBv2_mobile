import { connect } from 'react-redux';

import ComplaintResult from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch/ComplaintResult';
import { reset } from 'actions/suggestion';


const mapDispatchToProps = {
  reset
};

export default connect(null, mapDispatchToProps)(ComplaintResult);
