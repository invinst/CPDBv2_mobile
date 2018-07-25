import React from 'react';
import { connect } from 'react-redux';

import { requestDocument } from 'actions/trr-page';
import RequestDocumentButton from 'components/common/request-document/request-document-button';


const mapDispatchToProps = {
  requestDocument: requestDocument
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.trrId,
    message: state.trrPage.attachmentRequest.message,
    isRequested: state.trrPage.attachmentRequest.subscribedTRRIds[ownProps.trrId]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDocumentButton);
