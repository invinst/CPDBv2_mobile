import React from 'react';

import invistLogoImage from 'img/invist-logo.svg';
import style from './footer.sass';

const Footer = () => {
  return (
    <div className={ style.footer }>
      <div className='footer-items'>
        <div className='item'>Legal</div>
        <a className='item' target='_blank' href='https://github.com/invinst/'>Github</a>
        <a className='item' target='_blank' href='http://roadmap.cpdp.co/'>Roadmap</a>
        <div className='item'>Contact</div>
      </div>
      <a
        href='https://invisible.institute/introduction'
        className='invist-logo-link'
        target='_blank'>
        <img className='invist-logo' src={ invistLogoImage } alt='Invisible Institute' />
      </a>
    </div>
  );
};

export default Footer;
