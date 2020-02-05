import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ClampLines from 'react-clamp-lines';
import cx from 'classnames';

import style from './attachment.sass';
import { thumbnailStyle } from 'components/complaint-page/attachments/attachments.style';


class Attachment extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onTrackingAttachment, attachment } = this.props;
    onTrackingAttachment(
      { attachmentId: attachment['id'], sourcePage: 'Officer Page - Attachments Tab', app: 'Mobile' }
    );
  }

  render() {
    const { title, url, previewImageUrl, fileType } = this.props.attachment;
    return (
      <a
        href={ url }
        className={ style.officerAttachmentsTabComplaintAttachment }
        target='_blank'
        onClick={ this.handleClick }
      >
        <div
          className={ cx('attachment-thumbnail', fileType) }
          style={ thumbnailStyle(fileType, previewImageUrl) }
        />
        <ClampLines
          className='attachment-title'
          text={ title }
          lines='2'
          ellipsis='...'
        />
      </a>
    );
  }
}

Attachment.propTypes = {
  attachment: PropTypes.object,
  onTrackingAttachment: PropTypes.func,
};

Attachment.defaultProps = {
  onTrackingAttachment: () => {},
};

export default Attachment;
