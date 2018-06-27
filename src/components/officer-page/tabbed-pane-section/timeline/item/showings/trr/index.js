import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './trr.sass';


export default class Trr extends Component {
  render() {
    const { item, hasBorderBottom } = this.props;

    return (
      <Link className={ cx(styles.wrapper) } to={ `/trr/${item.trrId}/` }>
        <div className={ cx('content', { 'no-border-bottom': !hasBorderBottom }) }>
          <span className='kind'>F</span>
          <span className='category'>{ item.category }</span>
          <span className='date'>{ item.date }</span>
        </div>
      </Link>
    );
  }
}

Trr.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
};
