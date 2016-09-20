import React from 'react';
import cx from 'classnames';

import style from 'styles/MainPage/MainPageContent/VFTG.sass';


const VFTG = React.createClass({
  propTypes: {
    topLeft: React.PropTypes.number
  },

  render() {
    const topLeft = this.props.topLeft;

    return (
      <div className={ cx(style.vftg, 'vftg row animation', { 'top-left': topLeft }) }>
        <div className='issue-time row'>
          <span className='at-issue'>AT ISSUE: </span>
          <span className='time'>Sep 23, 2016</span>
        </div>
        <div className='news'>Complaints against Chicago Police rarely result in discipline data shows.</div>
        <div className='most-recent'>
          <div><img src='../../../img/medium-icon.svg' /></div>
          <div className='most-recent-email'>Most Recent Email</div>
        </div>
        <div className='clearfix'></div>

        <div className='email-box'>
          <input
            className='email-input'
            placeholder='Enter your email'
            ref='input'
            />
        </div>

        <div className='subscribe'>
          <div className='btn btn-subscribe'>Subscribe</div>
        </div>
      </div>
    );
  }
});

export default VFTG;
