import React, { Component } from 'react';

import style from 'styles/trr-page/attachment.sass';


class Attachment extends Component {
  render() {

    return (
      <div className={ style.attachment }>
        <div className='title'>
          ATTACHMENTS
          <div className='request-document-button'>Request Documents</div>
        </div>
        <div className='subtitle'>May contain graphic content</div>
      </div>
    );
  }
}

export default Attachment;
