import React, { Component, PropTypes } from 'react';

import style from './description-content.sass';
import CMSContent from 'components/landing-page/cms-content';


export default class DescriptionContent extends Component {
  render() {
    const { content, subContent } = this.props;

    return (
      <div className={ style.descriptionContent }>
        <CMSContent className='content' content={ content }/>
        <CMSContent className='sub-content' content={ subContent }/>
      </div>
    );
  }
}

DescriptionContent.propTypes = {
  content: PropTypes.object,
  subContent: PropTypes.object
};
