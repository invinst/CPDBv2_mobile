import React from 'react';
import { connect } from 'react-redux';

import { requestDocument } from 'actions/complaint-page';
import RequestDocumentButton from 'components/common/request-document/request-document-button';


const mapDispatchToProps = {
  requestDocument: requestDocument
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.crid,
    customClassName: ownProps.customClassName,
    message: state.complaintPage.attachmentRequest.message,
    isRequested: state.complaintPage.attachmentRequest.subscribedCRIds[ownProps.crid]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDocumentButton);
