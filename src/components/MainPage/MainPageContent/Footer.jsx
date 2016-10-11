import React, { Component } from 'react';

import cx from 'classnames';

import style from 'styles/MainPage/MainPageContent/Footer.sass';

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isSearchFocused = this.props.isSearchFocused;

    return (
      <div className={cx(style.footer, 'footer', { hidden: isSearchFocused })}>
        <a className='footer-link'>Legal Disclaimer</a>
        <a className='footer-link'>Glossary</a>
        <a className='footer-link'>Complaints Process</a>
      </div>
    );
  }
}

Footer.defaultProps = {
  isSearchFocused: false
};
