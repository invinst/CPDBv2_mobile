import { connect } from 'react-redux';

import LawsuitPage from 'components/lawsuit-page';
import { lawsuitSelector } from 'selectors/lawsuit-page';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';
import { fetchLawsuit } from 'actions/lawsuit-page';


function mapStateToProps(state, ownProps) {
  return {
    lawsuitCaseNo: ownProps.match.params.lawsuitCaseNo,
    lawsuit: lawsuitSelector(state, ownProps),
    ...ownProps,
  };
}

const mapDispatchToProps = {
  addOrRemoveItemInPinboard,
  fetchLawsuit,
};

export default connect(mapStateToProps, mapDispatchToProps)(LawsuitPage);
