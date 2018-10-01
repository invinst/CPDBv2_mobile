import React, { Component, PropTypes } from 'react';

import style from './attachment.sass';
import TRRRequestDocumentButtonContainer from 'containers/common/trr-request-document-container';


class Attachment extends Component {
  render() {

    return (
      <div className={ style.attachment }>
        <div className='header'>
          <div className='title'>
            There are no documents that have been made public yet.
          </div>
          <TRRRequestDocumentButtonContainer trrId={ this.props.trrId } customClassName='request-button-container' />
        </div>
      </div>
    );
  }
}

Attachment.propTypes = {
  trrId: PropTypes.number,
};

export default Attachment;
