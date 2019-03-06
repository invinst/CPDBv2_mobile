import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import CRRequestDocumentButtonContainer from 'containers/common/cr-request-document-container';
import styles from './attachments.sass';
import * as GATracking from 'utils/google_analytics_tracking';
import { thumbnailStyle } from './attachments.style';


class Attachments extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(url, id) {
    const { pathname, onTrackingAttachment } = this.props;
    GATracking.trackAttachmentClick(pathname, url);
    onTrackingAttachment({ attachmentId: id, sourcePage: 'CR Page', app: 'Mobile' });
  }

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
};

Attachments.defaultProps = {
  attachments: [],
  onTrackingAttachment: () => {},
};

export default Attachments;
