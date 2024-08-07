import React from 'react';
import PropTypes from 'prop-types';

import { QA_URL } from 'constants/index';
import styles from './header-links.sass';


export default function HeaderLinks() {
  return (
    <div className={ styles.headerLinks }>
      <a href={ QA_URL } className='header-link'>Q&A</a>
    </div>
  );
}

HeaderLinks.propTypes = {
  position: PropTypes.string,
};

HeaderLinks.defaultProps = {
  position: 'top',
};
