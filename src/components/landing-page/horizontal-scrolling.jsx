import React, { PropTypes } from 'react';
import cx from 'classnames';
import Swiper from 'swiper';

import style from './horizontal-scrolling.sass';


class HorizontalScrolling extends React.Component {
  constructor(props) {
    super(props);
    this.swiper = null;
  }

  componentDidMount() {
    const defaultOptions = {
      spaceBetween: 8,
      slidesPerView: 'auto',
      slidesOffsetAfter: 32
    };
    this.swiper = new Swiper(this.el, { ...defaultOptions, ...this.props.slideOptions });
  }

  componentDidUpdate() {
    /* istanbul ignore next */
    if (this.swiper) {
      this.swiper.update();
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
  slideOptions: PropTypes.object
};

export default HorizontalScrolling;
