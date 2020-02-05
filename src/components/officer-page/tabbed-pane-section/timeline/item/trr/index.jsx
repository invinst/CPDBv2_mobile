import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './trr.sass';


export default class Trr extends Component {
  render() {
    const { item, className } = this.props;

    return (
      <Link className={ cx(styles.wrapper, className) } to={ `/trr/${item.trrId}/` }>
        <div className='content'>
          <span className='kind'>F</span>
          <span className='category'>{ item.category }</span>
          <span className='date'>{ item.date }</span>
        </div>
      </Link>
    );
  }
}

Trr.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
};
