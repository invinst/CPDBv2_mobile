import { connect } from 'react-redux';

import { requestDocument } from 'actions/complaint-page';
import RequestDocumentButton from 'components/common/request-document/request-document-button';
import { requestDocumentButtonMessage, buttonText } from 'selectors/complaint-page';


const mapDispatchToProps = {
  requestDocument: requestDocument,
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.crid,
    customClassName: ownProps.customClassName,
    message: state.complaintPage.attachmentRequest.message,
    isRequested: state.complaintPage.attachmentRequest.subscribedCRIds[ownProps.crid],
    documentRequestMessage: requestDocumentButtonMessage(state, ownProps),
    buttonText: buttonText(state, ownProps),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDocumentButton);
