import React, { Component, PropTypes } from 'react';

import style from './award.sass';


export default class Award extends Component {

  render() {
    const { item, hasBorderBottom, baseStyles } = this.props;
    return (
      <span style={ style.wrapperShowing }>
        <span
          className='showing'
        >
          <div className='wrapper-kind'>
            <span
              className='kind'
            >
              Award
            </span>
          </div>
          <span
            className='category'
          >
            { item.category }
          </span>
          <span
            className='date'
          >
            { item.date }
          </span>
        </span>
      </span>
    );
  }
}

Award.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
  baseStyles: PropTypes.object,
};
