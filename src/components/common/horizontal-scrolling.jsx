import React, { PropTypes } from 'react';
import cx from 'classnames';
import Swiper from 'swiper';

import style from './horizontal-scrolling.sass';
import * as GATracking from 'utils/google_analytics_tracking';


class HorizontalScrolling extends React.Component {
  constructor(props) {
    super(props);
    this.swiper = null;

    this.handleSlideNext = this.handleSlideNext.bind(this);
    this.handleSlidePrev = this.handleSlidePrev.bind(this);
    this.handleReachEnd = this.handleReachEnd.bind(this);
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
        slideNextTransitionStart: this.handleSlideNext,
        slidePrevTransitionStart: this.handleSlidePrev,
        reachEnd: this.handleReachEnd,
      }
    };
    this.swiper = new Swiper(this.el, { ...defaultOptions, ...slideOptions });
  }

  componentDidUpdate() {
    /* istanbul ignore next */
    if (this.swiper) {
      this.swiper.update();
    }
  }

  handleReachEnd() {
    const { hasMore, loadMore } = this.props;
    hasMore && loadMore();
  }

  handleSlideNext() {
    const { trackingContentType } = this.props;
    if (trackingContentType) {
      GATracking.trackSwipeLanddingPageCarousel('right', trackingContentType);
    }
  }

  handleSlidePrev() {
    const { trackingContentType } = this.props;
    if (trackingContentType) {
      GATracking.trackSwipeLanddingPageCarousel('left', trackingContentType);
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
};

HorizontalScrolling.defaultProps = {
  hasMore: false,
  loadMore: () => {},
  spaceBetween: 8,
};

export default HorizontalScrolling;
