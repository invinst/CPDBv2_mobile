import React, { Component } from 'react';
import style from 'styles/MainPage/MainPageContent/Footer.sass';

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.footer}>
        <a className='footer-link'>Legal Disclaimer</a>
        <a className='footer-link'>Glossary</a>
        <a className='footer-link'>Complaints Process</a>
      </div>
    );
  }
}
