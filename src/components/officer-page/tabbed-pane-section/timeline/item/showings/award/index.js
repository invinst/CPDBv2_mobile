import React, { Component, PropTypes } from 'react';

import styles from './award.sass';


export default class Award extends Component {

  render() {
    const { item, hasBorderBottom } = this.props;
    return (
      <div className={ styles.wrapper }>
        <div className='content'>
          <span className='kind'>A</span>
          <span className='category'>{ item.category }</span>
          <span className='date'>{ item.date }</span>
        </div>
      </div>
    );
  }
}

Award.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
};
