import React, { PropTypes } from 'react';
import cx from 'classnames';

import style from './horizontal-scrolling.sass';


const HorizontalScrolling = ({ children, className }) => {
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
};

HorizontalScrolling.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default HorizontalScrolling;
