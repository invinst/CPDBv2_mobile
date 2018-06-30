import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import style from './horizontal-scrolling.sass';


export default class HorizontalScrolling extends Component {
  renderChildren() {
    const { children } = this.props;

    return React.Children.map(children, child => {
      const childProps = {
        ...child.props,
        className: cx('slide-item', child.props.className)
      };

      return React.cloneElement(child, childProps);
    });
  }

  render() {
    const { className, children } = this.props;

    return (
      <div className={ cx(style.horizontalScrolling, className) }>
        <div className='swiper-wrapper'>
          <div className='slide-wrapper'>
            {
              React.Children.map(children, child => (
                <span className='slide-item'>
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
  className: PropTypes.string
};
