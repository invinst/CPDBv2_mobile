import React from 'react';
import PropTypes from 'prop-types';

import style from './attachment.sass';
import TRRRequestDocumentButtonContainer from 'containers/common/trr-request-document-container';


function Attachment(props) {

  return (
    <div className={ style.attachment }>
      <div className='attachment-header'>
        <div className='title'>
          There are no documents that have been made public yet.
        </div>
        <TRRRequestDocumentButtonContainer trrId={ props.trrId } customClassName='request-button-container' />
      </div>
    </div>
  );
}

Attachment.propTypes = {
  trrId: PropTypes.number,
};

export default Attachment;
