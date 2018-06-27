import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './trr.sass';


export default class Trr extends Component {
  render() {
    const { item, hasBorderBottom } = this.props;

    return (
      <Link
        className={ cx(styles.wrapperShowing) }
        to={ `/trr/${item.trrId}/` }
      >
        <span className='showing'>
          <div className='wrapper-kind'>
            <span className='kind'>Force</span>
          </div>
          <span
            className='category'
          >
            { item.category }
          </span>
          <span className='date'>{ item.date }</span>
        </span>
      </Link>
    );
  }
}

Trr.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
};
