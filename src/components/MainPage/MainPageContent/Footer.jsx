import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cs from 'constants';

import cx from 'classnames';
import style from 'styles/MainPage/MainPageContent/Footer.sass';

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isSearchFocused = this.props.isSearchFocused;

    return (
      <div className={ cx(style.footer, 'footer', { hidden: isSearchFocused }) }>
        <Link className='footer-link' to={ cs.REPORTING_PATH }>Reporting</Link>
        <Link className='footer-link' to={ cs.REPORTING_PATH }>FAQ</Link>
        <Link className='footer-link' to={ cs.REPORTING_PATH }>About</Link>
      </div>
    );
  }
}

Footer.defaultProps = {
  isSearchFocused: false
};

Footer.propTypes = {
  isSearchFocused: PropTypes.number
};
