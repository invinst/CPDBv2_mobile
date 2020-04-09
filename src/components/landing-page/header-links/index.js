import React from 'react';
import PropTypes from 'prop-types';

import constants from 'constants/index';
import PinboardButton from 'components/landing-page/header-links/pinboard-button';
import styles from './header-links.sass';


export default function HeaderLinks() {
  return (
    <div className={ styles.headerLinks }>
      <a href={ constants.QA_URL } className='header-link'>Q&A</a>
      <PinboardButton />
    </div>
  );
}

HeaderLinks.propTypes = {
  position: PropTypes.string,
};

HeaderLinks.defaultProps = {
  position: 'top',
};
