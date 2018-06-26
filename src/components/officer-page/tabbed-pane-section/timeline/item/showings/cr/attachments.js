import React, { Component, PropTypes } from 'react';

import { imageStyle, wrapperStyle, moreStyle } from './attachments.style';


export default class Attachments extends Component {
  render() {
    const { attachments } = this.props;
    const [firstAttachment, ...rest] = attachments;
    if (firstAttachment) {
      const { url, previewImageUrl, fileType } = firstAttachment;
      return (
        <span style={ wrapperStyle }>
          {
            rest.length
              ? (
                <span
                  style={ moreStyle }
                  className='test--more-attachment'
                >
                  +{ rest.length }
                </span>
              )
              : null
          }
          <a href={ url } className='test--attachment-image-href' target='_blank'>
            <div
              className='test--attachment-image'
              style={ imageStyle(previewImageUrl, fileType) }
            />
          </a>
        </span>
      );
    }
    return <span style={ wrapperStyle }/>;
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
};
