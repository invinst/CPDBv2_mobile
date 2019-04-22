import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './header.sass';


export default class Header extends Component {
  render() {
    return (
      <div className={ style.wrapper } >
        <div className='header-parent'>
          <Link
            className='header-title'
            to='/'>
            cpdp
          </Link>
          <div className='right-menu'>
            <div className='menu-item highlight'>
              Pinboard
            </div>
          </div>
        </div>
      </div>
    );
  }
}
