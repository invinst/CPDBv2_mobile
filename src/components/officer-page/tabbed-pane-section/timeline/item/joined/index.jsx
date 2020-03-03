import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './joined.sass';


export default function Joined(props) {
  const { className, item } = props;

  return (
    <span className={ cx(styles.wrapper, className) }>
      <span className='join'>Joined CPD</span>
      <span className='date'>{ item.date }</span>
    </span>
  );
}

Joined.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
};
