import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import styles from './trr.sass';


export default function Trr(props) {
  const { item, className } = props;

  return (
    <Link className={ cx(styles.wrapper, className) } to={ `/trr/${item.trrId}/` }>
      <div className='content'>
        <span className='kind'>F</span>
        <span className='category'>{ item.category }</span>
        <span className='ttr-right'>
          <span className='date'>{ item.date }</span>
        </span>
      </div>
    </Link>
  );
}

Trr.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
};
