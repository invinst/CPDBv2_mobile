import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CRRequestDocumentButtonContainer from 'containers/common/cr-request-document-container';
import styles from './attachments.sass';
import * as tracking from 'utils/tracking';
import { thumbnailStyle } from './attachments.style';
import CMSContent from 'components/common/cms-content';


class Attachments extends Component {
  handleClick = (url, id) => {
    const { pathname, onTrackingAttachment } = this.props;
    tracking.trackAttachmentClick(pathname, url);
    onTrackingAttachment({ attachmentId: id, sourcePage: 'CR Page', app: 'Mobile' });
  };

  render() {
    const { attachments, complaintId, noAttachmentMessage } = this.props;
    const noAttachment = attachments.length === 0;

    return (
      <div className={ styles.attachments }>
        <div className={ cx('header', { 'no-attachment': noAttachment }) }>
          <div className='label'>
            {
              noAttachment ?
                <CMSContent
                  content={ noAttachmentMessage }
                /> : 'DOCUMENTS'
            }
          </div>
          <CRRequestDocumentButtonContainer
            crid={ complaintId }
            customClassName='request-button-container'
          />
        </div>
        <div className='attachment-list'>
          {
            attachments.map((attachment, idx) => (
              <a
                href={ attachment.url }
                key={ idx } className='attachment'
                onClick={ () => this.handleClick(attachment.url, attachment.id) }
              >
                <div
                  className={ cx('attachment-thumbnail', attachment.fileType) }
                  style={ thumbnailStyle(attachment.fileType, attachment.previewImageUrl) }
                />
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
  complaintId: PropTypes.string,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
  noAttachmentMessage: PropTypes.object,
};

Attachments.defaultProps = {
  attachments: [],
  onTrackingAttachment: () => {},
};

export default Attachments;
