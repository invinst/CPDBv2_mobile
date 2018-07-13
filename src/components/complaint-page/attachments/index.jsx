import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import Image from 'components/shared/image';
import document from 'img/ic-document.jpg';
import audio from 'img/ic-audio.svg';
import video from 'img/ic-video.svg';
import CRRequestDocumentButtonContainer from 'containers/common/cr-request-document-container';
import styles from './attachments.sass';


const TYPE_TO_ICONS = {
  document, audio, video
};

class Attachments extends Component {

  render() {
    const { attachments, complaintId } = this.props;
    const noAttachment = attachments.length === 0;

    return (
      <div className={ styles.attachments }>
        <div className={ cx('header', { 'no-attachment': noAttachment }) }>
          <div className='label'>
            {
              noAttachment ? 'There are no documents that have been made public yet.' : 'ATTACHMENTS'
            }
          </div>
          <CRRequestDocumentButtonContainer crid={ complaintId } customClassName='request-button-container'/>
        </div>
        <div className='attachment-list'>
          {
            attachments.map((attachment, idx) => (
              <a href={ attachment.url } key={ idx } className='attachment'>
                <div className='attachment-thumbnail-wrapper'>
                  <Image
                    className={ cx('attachment-thumbnail', attachment.fileType) }
                    src={ attachment.previewImageUrl }
                    fallback={ TYPE_TO_ICONS[attachment.fileType] }
                    />
                </div>
                <div className='attachment-title'>{ attachment.title }</div>
              </a>
            ))
          }
        </div>
      </div>
    );
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
  complaintId: PropTypes.string
};

Attachments.defaultProps = {
  attachments: [],
};

export default Attachments;
