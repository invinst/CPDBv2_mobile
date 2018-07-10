import React, { Component, PropTypes } from 'react';

import style from './description-content.sass';


export default class DescriptionContent extends Component {
  render() {
    const { content, subContent } = this.props;

    return (
      <div className={ style.descriptionContent }>
        <p className='content'>{ content }</p>
        <p className='sub-content'>{ subContent }</p>
      </div>
    );
  }
}

DescriptionContent.propTypes = {
  content: PropTypes.string,
  subContent: PropTypes.string
};
