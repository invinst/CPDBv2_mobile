import React, { Component, PropTypes } from 'react';
import ClampLines from 'react-clamp-lines';
import cx from 'classnames';

import Image from 'components/shared/image';
import document from 'img/ic-document.jpg';
import audio from 'img/ic-audio.svg';
import video from 'img/ic-video.svg';
import style from './attachment.sass';


const TYPE_TO_ICONS = {
  document, audio, video
};


class Attachment extends Component {
  render() {
    const { title, url, previewImageUrl, fileType } = this.props.attachment;
    return (
      <a
        href={ url }
        className={ style.officerAttachmentsTabComplaintAttachment }
        target='_blank'
      >
        <div className='attachment-thumbnail-wrapper'>
          <Image
            className={ cx('attachment-thumbnail', fileType) }
            src={ previewImageUrl }
            fallback={ TYPE_TO_ICONS[fileType] }
          />
        </div>
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
