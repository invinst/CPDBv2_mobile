import React, { Component, PropTypes } from 'react';
import ClipboardButton from 'react-clipboard.js';
import { Link } from 'react-router';
import constants from 'constants';
import style from 'styles/Shared/Navbar.sass';
import facebookIcon from 'img/ic-facebook.svg';
import twitterIcon from 'img/ic-twitter.svg';

const pathNames = {
  '/': 'Home',
  [constants.SEARCH_PATH]: 'Search'
};

export default class Navbar extends Component {
  componentWillUnmount() {
    this.props.closeShareMenu();
  }

  renderMenu() {
    const { shareMenuIsOpen, closeShareMenu } = this.props;

    if (!shareMenuIsOpen) {
      return null;
    }

    const encodedLink = encodeURIComponent(window.location.href);

    return (
      <div className='share-menu'>
        <ClipboardButton
          className='copy-link item'
          onClick={ closeShareMenu }
          data-clipboard-text={ window.location.href }>
          Copy Link
        </ClipboardButton>

        <a
          className='tweet item'
          href={ 'https://twitter.com/intent/tweet?url=' + encodedLink }
          target='_blank'
          onClick={ closeShareMenu }
        >
          Tweet <img src={ twitterIcon } />
        </a>

        <a
          className='share item'
          href={ 'https://www.facebook.com/sharer/sharer.php?u=' + encodedLink }
          target='_blank'
          onClick={ closeShareMenu }
        >
          Share <img src={ facebookIcon } />
        </a>
      </div>
    );
  }

  render() {
    const { backLink, openShareMenu, shareMenuIsOpen, closeShareMenu } = this.props;
    const shareButtonClickHandler = shareMenuIsOpen ? closeShareMenu : openShareMenu;
    const shareButtonClass = 'right-link' + (shareMenuIsOpen ? ' active' : '');
    const backLinkText = `Back to ${pathNames[backLink]}`;

    return (
      <div className={ style.navbar }>
        <Link className='left-link' to={ backLink }>{ backLinkText }</Link>
        <span className={ shareButtonClass } onClick={ shareButtonClickHandler }>Share</span>
        { this.renderMenu() }
      </div>
    );
  }
}

Navbar.propTypes = {
  backLink: PropTypes.string,
  closeShareMenu: PropTypes.func,
  openShareMenu: PropTypes.func,
  shareMenuIsOpen: PropTypes.bool
};

Navbar.defaultProps = {
  backLink: '/'
};
