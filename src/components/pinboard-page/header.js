import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './header.sass';


export default class Header extends Component {
  render() {
    return (
      <Link className={ style.wrapper } to='/'>
        <div className='header-parent'>
          <div className='header-title'>cpdp</div>
          <div className='right-menu'>
            <div className='menu-item highlight' onClick={ e => e.preventDefault() }>
              Pinboard
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
