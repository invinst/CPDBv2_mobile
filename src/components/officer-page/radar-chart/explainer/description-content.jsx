import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './description-content.sass';
import CMSContent from 'components/common/cms-content';


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
  subContent: PropTypes.object,
};
