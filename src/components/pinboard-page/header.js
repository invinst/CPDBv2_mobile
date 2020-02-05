import React from 'react';
import { Link } from 'react-router';

import style from './header.sass';
import IOSPeek from 'components/common/ios-peek';


export default function Header(props) {
  return (
    <Link className={ style.wrapper } to='/'>
      <IOSPeek className='pinboard-ios-peek'/>
      <div className='header-parent'>
        <div className='header-title'>cpdp</div>
        <div className='right-menu'>
          <div className='menu-item highlight' onClick={ e => e.preventDefault() }>
            Pinboards
          </div>
        </div>
      </div>
    </Link>
  );
}
