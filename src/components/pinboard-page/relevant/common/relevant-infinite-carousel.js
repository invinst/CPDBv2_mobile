import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './relevant-infinite-carousel.sass';
import HorizontalScrolling from 'components/common/horizontal-scrolling';
import LoadingSpinner from 'components/common/loading-spinner';


export default class RelevantInfiniteCarousel extends Component {
  render() {
    const { children, title, hasMore, loadMore, className, requesting } = this.props;
    const noChild = !children || children.length < 1;

    if (!requesting && noChild)
      return null;

    return (
      <div className={ cx(className, styles.relevantInfiniteCarousel) }>
        <div className='relevant-infinite-carousel-title-wrapper'>
          <div className='relevant-infinite-carousel-title'>{ title }</div>
          <div className='relevant-infinite-carousel-tip'>{ '<< Swipe for more' }</div>
        </div>
        { (requesting && noChild) ? (
          <LoadingSpinner className='relevant-carousel-loading' fill='white' />
        ) : (
          <HorizontalScrolling
            hasMore={ hasMore }
            loadMore={ loadMore }
            className='relevant-infinite-horizontal-scrolling'
            spaceBetween={ 4 }
          >
            { children }
          </HorizontalScrolling>
        ) }
      </div>
    );
  }
}

RelevantInfiniteCarousel.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func,
  className: PropTypes.string,
  requesting: PropTypes.bool,
};
