import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './ios-peek.sass';


const IOSPeek = ({ className, isBottom }) => {
  return (
    <div className={ cx(styles.iosPeek, className, { bottom: isBottom }) }/>
  );
};

IOSPeek.propTypes = {
  className: PropTypes.string,
  isBottom: PropTypes.bool,
};

export default IOSPeek;
