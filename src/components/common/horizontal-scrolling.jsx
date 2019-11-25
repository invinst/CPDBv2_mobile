import React, { PropTypes } from 'react';
import cx from 'classnames';
import Swiper from 'swiper';

import style from './horizontal-scrolling.sass';
import * as tracking from 'utils/tracking';


class HorizontalScrolling extends React.Component {
  constructor(props) {
    super(props);
    this.swiper = null;

    this.handleSlideNext = this.handleSlideNext.bind(this);
    this.handleSlidePrev = this.handleSlidePrev.bind(this);
    this.onSnapIndexChange = this.onSnapIndexChange.bind(this);
  }

  componentDidMount() {
    const { centeredContent, slideOptions, spaceBetween } = this.props;
    const defaultOptions = {
      spaceBetween,
      slidesPerView: 'auto',
      direction: 'horizontal',
      slidesOffsetAfter: 32,
      centerInsufficientSlides: centeredContent,
      on: {
        snapIndexChange: () => {
          if (!this.swiper) return;
          const { activeIndex, isEnd } = this.swiper;
          this.onSnapIndexChange(activeIndex, isEnd);
        },
        slideNextTransitionStart: this.handleSlideNext,
        slidePrevTransitionStart: this.handleSlidePrev,
      },
    };
    this.swiper = new Swiper(this.el, { ...defaultOptions, ...slideOptions });
  }

  componentDidUpdate() {
    /* istanbul ignore next */
    if (this.swiper) {
      this.swiper.update();
    }
  }

  onSnapIndexChange(activeIndex, isEnd) {
    const { children, loadMoreThreshold, hasMore, loadMore } = this.props;
    if (isEnd || children.length - activeIndex <= loadMoreThreshold) {
      hasMore && loadMore();
    }
  }

  handleSlideNext() {
    const { trackingContentType } = this.props;
    if (trackingContentType) {
      tracking.trackSwipeLandingPageCarousel('right', trackingContentType);
    }
  }

  handleSlidePrev() {
    const { trackingContentType } = this.props;
    if (trackingContentType) {
      tracking.trackSwipeLandingPageCarousel('left', trackingContentType);
    }
  }

  render() {
    const { className, children } = this.props;

    return (
      <div className={ cx(style.horizontalScrolling, className) }>
        <div ref={ el => this.el = el }>
          <div className='swiper-wrapper'>
            {
              React.Children.map(children, child => (
                <span className='swiper-slide'>
                  { child }
                </span>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

HorizontalScrolling.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  slideOptions: PropTypes.object,
  trackingContentType: PropTypes.string,
  centeredContent: PropTypes.bool,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  spaceBetween: PropTypes.number,
  loadMoreThreshold: PropTypes.number,
};

HorizontalScrolling.defaultProps = {
  hasMore: false,
  loadMore: () => {},
  spaceBetween: 8,
  loadMoreThreshold: 2,
};

export default HorizontalScrolling;
