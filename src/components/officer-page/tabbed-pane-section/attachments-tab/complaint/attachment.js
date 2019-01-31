import React, { Component, PropTypes } from 'react';
import ClampLines from 'react-clamp-lines';
import cx from 'classnames';

import style from './attachment.sass';
import { thumbnailStyle } from 'components/complaint-page/attachments/attachments.style';


class Attachment extends Component {
  render() {
    const { title, url, previewImageUrl, fileType } = this.props.attachment;
    return (
      <a
        href={ url }
        className={ style.officerAttachmentsTabComplaintAttachment }
        target='_blank'
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
};

export default Attachment;
