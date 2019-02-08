import React from 'react';
import { connect } from 'react-redux';

import { requestDocument } from 'actions/complaint-page';
import RequestDocumentButton from 'components/common/request-document/request-document-button';
import { cmsSelector } from 'selectors/common/cms';


const mapDispatchToProps = {
  requestDocument: requestDocument
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.crid,
    customClassName: ownProps.customClassName,
    hasData: ownProps.hasData,
    message: state.complaintPage.attachmentRequest.message,
    isRequested: state.complaintPage.attachmentRequest.subscribedCRIds[ownProps.crid],
    documentRequestMessage: cmsSelector(state, 'complaintPage', 'document_request_instruction'),
    newDocumentNotificationMessage: cmsSelector(state, 'complaintPage', 'new_document_notification'),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDocumentButton);
