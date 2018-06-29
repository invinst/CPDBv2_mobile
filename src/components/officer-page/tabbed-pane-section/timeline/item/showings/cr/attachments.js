import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './attachments.sass';
import { ATTACHMENT_TYPES } from 'constants';


export default class Attachments extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const url = this.props.attachments[0].url;
    window.open(url, '_blank');
  }

  render() {
    const firstAttachment = this.props.attachments[0];
    if (firstAttachment) {
      const { fileType, previewImageUrl } = firstAttachment;
      return (
        <div className={ cx(styles.wrapper) } >
          <div
            className={ cx('image', { 'image-document': fileType === ATTACHMENT_TYPES.DOCUMENT }) }
            style={ { backgroundImage: `url(${previewImageUrl})` } }
            onClick={ this.handleClick }
          />
        </div>
      );
    }
    return <span className={ cx(styles.wrapper) }/>;
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
};
