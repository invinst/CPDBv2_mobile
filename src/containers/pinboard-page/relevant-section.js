import { connect } from 'react-redux';

import RelevantSection from 'components/pinboard-page/relevant';
import {
  relevantDocumentsSelector,
  relevantDocumentsNextParamsSelector,
  relevantDocumentsHasMoreSelector,
} from 'selectors/pinboard-page/relevant-documents';
import {
  relevantCoaccusalsSelector,
  relevantCoaccusalsNextParamsSelector,
  relevantCoaccusalsHasMoreSelector,
} from 'selectors/pinboard-page/relevant-coaccusals';
import {
  relevantComplaintsSelector,
  relevantComplaintsNextParamsSelector,
  relevantComplaintsHasMoreSelector,
} from 'selectors/pinboard-page/relevant-complaints';
import {
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  addItemInPinboardPage,
} from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    documents: relevantDocumentsSelector(state, ownProps),
    documentHasMore: relevantDocumentsHasMoreSelector(state, ownProps),
    documentNextParams: relevantDocumentsNextParamsSelector(state, ownProps),
    coaccusals: relevantCoaccusalsSelector(state, ownProps),
    coaccusalHasMore: relevantCoaccusalsHasMoreSelector(state, ownProps),
    coaccusalNextParams: relevantCoaccusalsNextParamsSelector(state, ownProps),
    complaints: relevantComplaintsSelector(state, ownProps),
    complaintHasMore: relevantComplaintsHasMoreSelector(state, ownProps),
    complaintNextParams: relevantComplaintsNextParamsSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  addItemInPinboardPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(RelevantSection);
