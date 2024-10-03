import React from 'react';
import PropTypes from 'prop-types';

import { QA_URL, NPI_URL } from 'constants/index';
// import PinboardButtonContainer from 'containers/landing-page/header-links/pinboard-button-container';
import styles from './header-links.sass';


export default function HeaderLinks() {
  return (
    <div className={ styles.headerLinks }>
      <a href={ QA_URL } className='header-link'>Q&A</a>
      <a href={ NPI_URL } target='_blank' rel='noopener noreferrer' className='header-link'>National Police Index</a>
      {/* <PinboardButtonContainer /> */}
    </div>
  );
}

HeaderLinks.propTypes = {
  position: PropTypes.string,
};

HeaderLinks.defaultProps = {
  position: 'top',
};
