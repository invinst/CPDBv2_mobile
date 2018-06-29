import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './attachments.sass';
import { ATTACHMENT_TYPES } from 'constants';


export default class Attachments extends Component {
  render() {
    const { attachments } = this.props;
    const firstAttachment = attachments[0];
    if (firstAttachment) {
      const { url, fileType } = firstAttachment;
      return (
        <span className={ cx(styles.wrapper) } >
          <a
            href={ url }
            target='_blank'
            className={ cx('image', { 'image-document': fileType === ATTACHMENT_TYPES.DOCUMENT }) }
            style={ { backgroundImage: `url(${firstAttachment.previewImageUrl})` } }
          />
        </span>
      );
    }
    return <span className={ cx(styles.wrapper) }/>;
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
};
