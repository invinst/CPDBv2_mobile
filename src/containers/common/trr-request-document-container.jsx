import { connect } from 'react-redux';

import { requestDocument } from 'actions/trr-page';
import RequestDocumentButton from 'components/common/request-document/request-document-button';
import { requestDocumentButtonMessage, buttonText } from 'selectors/trr-page';


const mapDispatchToProps = {
  requestDocument: requestDocument,
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.trrId,
    message: state.trrPage.attachmentRequest.message,
    isRequested: state.trrPage.attachmentRequest.subscribedTRRIds[ownProps.trrId],
    documentRequestMessage: requestDocumentButtonMessage(state, ownProps),
    buttonText: buttonText(state, ownProps),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDocumentButton);
