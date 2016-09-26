import React, {Component} from 'react';
import cx from 'classnames';

import style from 'styles/MainPage/MainPageContent/Collaborate.sass';


export default class Collaborate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ cx(style.collaborate, 'landing-section') }>
        <div className='landing-section-header'>
          <p className='landing-section-title'>Collaborate with us</p>
        </div>
        <br className='clearBoth'/>
        <div className='section-description'>
          <div>We are collecting and publishing information that sheds light on police misconduct.</div>
          <br />
          <br />
          <div>
            <span>If you have documents or datasets you would like to publish, please </span> <a href='#'>email
            us</a><span>, or </span><a href='#'>learn more</a>.
          </div>
        </div>
      </div>
    )
  }
}
