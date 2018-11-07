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
  }

  componentDidMount() {
    const defaultOptions = {
      spaceBetween: 8,
      slidesPerView: 'auto',
      direction: 'horizontal',
      slidesOffsetAfter: 32,
      on: {
        slideNextTransitionStart: this.handleSlideNext,
        slidePrevTransitionStart: this.handleSlidePrev,
      }
    };
    this.swiper = new Swiper(this.el, { ...defaultOptions, ...this.props.slideOptions });
  }

  componentDidUpdate() {
    /* istanbul ignore next */
    if (this.swiper) {
      this.swiper.update();
    }
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
  trackingContentType: PropTypes.string
};

export default HorizontalScrolling;
