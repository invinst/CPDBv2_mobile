import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './attachments.sass';
import { ATTACHMENT_TYPES } from 'constants/officer-page/tabbed-pane-section/timeline';


export default class Attachments extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // this is necessary at we cannot use nested anchors
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
        <div className={ cx(styles.wrapper, 'test--attachments') } >
          <div
            className={ cx('image', { 'document': fileType === ATTACHMENT_TYPES.DOCUMENT }) }
            style={ { backgroundImage: `url(${previewImageUrl})` } }
            onClick={ this.handleClick }
          />
        </div>
      );
    }
    return null;
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
};
