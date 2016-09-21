import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import S from 'string';

import style from 'styles/MainPage/MainPageContent/VFTG.sass';
import mediumIcon from 'img/medium-icon.svg';
import Spinner from 'components/Shared/Spinner';


export default class VFTG extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { subscribeEmail } = this.props;

    console.log(this.emailInput.value);

    if (!S(this.emailInput.value).isEmpty()) {
      subscribeEmail(this.emailInput.value);
    }
  }

  render() {
    const topLeft = this.props.isSearchFocused;

    return (
      <div className={ cx(style.vftg, 'vftg row animation', { 'top-left': topLeft }) }>
        <div className='issue-time row'>
          <span className='at-issue'>AT ISSUE: </span>
          <span className='time'>Sep 23, 2016</span>
        </div>
        <div className='news'>Complaints against Chicago Police rarely result in discipline data shows.</div>
        <div className='most-recent'>
          <div><img src={ mediumIcon } /></div>
          <div className='most-recent-email'>Most Recent Email</div>
        </div>
        <div className='clearfix'></div>

        <div className='email-box'>
          <input
            ref={ el => { this.emailInput = el; } }
            className='email-input'
            placeholder='Enter your email'
            />
        </div>

        <div className='subscribe'>
          <div onClick={ this.handleClick } className='btn btn-subscribe'>Subscribe</div>
        </div>
      </div>
    );
  }
}

VFTG.proTypes = {
  topLeft: React.PropTypes.number,
  subscribeEmail: React.PropTypes.func
};
