import React, { Component, PropTypes } from 'react';

import style from './attachment.sass';
import TRRRequestDocumentButtonContainer from 'containers/common/trr-request-document-container';


class Attachment extends Component {
  render() {

    return (
      <div className={ style.attachment }>
        <div className='title'>
          ATTACHMENTS
          <TRRRequestDocumentButtonContainer id={ this.props.trrId }/>
        </div>
        <div className='subtitle'>May contain graphic content</div>
      </div>
    );
  }
}

Attachment.propTypes = {
  trrId: PropTypes.number,
};

export default Attachment;
