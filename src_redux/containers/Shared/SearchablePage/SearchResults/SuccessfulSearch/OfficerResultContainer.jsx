import { connect } from 'react-redux';

import OfficerResult from 'components/Shared/SearchablePage/SearchResults/SuccessfulSearch/OfficerResult';
import { reset } from 'actions/suggestion';


const mapDispatchToProps = {
  reset
};

export default connect(null, mapDispatchToProps)(OfficerResult);
