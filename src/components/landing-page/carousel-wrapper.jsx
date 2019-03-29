import React, { Component, PropTypes } from 'react';

import cx from 'classnames';

import CMSContent from 'components/common/cms-content';
import HorizontalScrolling from 'components/common/horizontal-scrolling';
import style from './carousel-wrapper.sass';


export default class CarouselWrapper extends Component {
  render() {
    const { children, className, title, description, embed, trackingContentType } = this.props;

    return (
      <div className={ cx(style.carouselWrapper, className, { embed }) }>
        <CMSContent className='carousel-title' content={ title } />
        <HorizontalScrolling trackingContentType={ trackingContentType }>
          <CMSContent className='carousel-description' content={ description } />
          { children }
        </HorizontalScrolling>
      </div>
    );
  }
}

CarouselWrapper.propTypes = {
  children: PropTypes.node,
  description: PropTypes.object,
  title: PropTypes.object,
  embed: PropTypes.bool,
  className: PropTypes.string,
  trackingContentType: PropTypes.string,
};
