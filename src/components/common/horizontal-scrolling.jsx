import React, { PropTypes } from 'react';
import cx from 'classnames';
import Swiper from 'swiper';

import style from './horizontal-scrolling.sass';
import * as GATracking from 'utils/google_analytics_tracking';


class HorizontalScrolling extends React.Component {
  constructor(props) {
    super(props);
    this.swiper = null;

    this.state = { activeIndex: 0 };
    this.handleSlideChange = this.handleSlideChange.bind(this);
  }

  componentDidMount() {
    const defaultOptions = {
      spaceBetween: 8,
      slidesPerView: 'auto',
      direction: 'horizontal',
      slidesOffsetAfter: 32,
      on: {
        slideChange: this.handleSlideChange,
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

  handleSlideChange() {
    const activeIndex = this.swiper.activeIndex;
    const lastActiveIndex = this.state.activeIndex;
    const { trackingContentType } = this.props;

    if (trackingContentType && activeIndex !== lastActiveIndex) {
      const direction = activeIndex > lastActiveIndex ? 'right' : 'left';
      GATracking.trackSwipeLanddingPageCarousel(direction, trackingContentType);
    }

    this.setState({ activeIndex });
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
