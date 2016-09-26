import React, { Component } from 'react';
import cx from 'classnames';

import style from 'styles/MainPage/MainPageContent/About.sass';


export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ cx(style.about, 'landing-section') }>
        <div className='landing-section-header'>
          <p className='landing-section-title'>About</p>
        </div>
        <br className='clearBoth'/>
        <div className='section-description'>
          The Citizens Police Data Project houses police disciplinary information obtained from the City of Chicago.
          <br/><br/>
          The information and stories we have collected here are intended as a resource for public oversight.
          <br/><br/>
          Our aim is to create a new model of accountability between officers and citizens.
        </div>
      </div>
    )
  }
}
