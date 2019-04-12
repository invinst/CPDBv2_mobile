import { connect } from 'react-redux';

import RelevantCoaccusals from 'components/pinboard-page/relevant/relevant-coaccusals';
import {
  relevantCoaccusalsSelector,
  relevantCoaccusalsNextParamsSelector,
  relevantCoaccusalsHasMoreSelector
} from 'selectors/pinboard-page/relevant-coaccusals';
import { fetchPinboardRelevantCoaccusals, addItemToPinboard } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    coaccusals: relevantCoaccusalsSelector(state, ownProps),
    hasMore: relevantCoaccusalsHasMoreSelector(state, ownProps),
    nextParams: relevantCoaccusalsNextParamsSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  fetchPinboardRelevantCoaccusals,
  addItemToPinboard
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelevantCoaccusals);
