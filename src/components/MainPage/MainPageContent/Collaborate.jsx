import React, { Component } from 'react';
import style from 'styles/MainPage/MainPageContent/LandingSection.sass';


export default class Collaborate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ style.landingSection }>
        <div className='landing-section-header'>
          <p className='landing-section-title'>Collaborate with us</p>
        </div>
        <br className='clearBoth'/>
        <div className='section-description'>
          We are collecting and publishing information that sheds light on police misconduct.
          <br/><br/>
          If you have documents or datasets you would like to publish, please  <a href=''>email us</a>, or <a href=''>learn more</a>.
        </div>
      </div>
    )
  }
}
