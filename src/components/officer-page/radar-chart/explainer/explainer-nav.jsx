import React, { Component, PropTypes } from 'react';

import style from './explainer-nav.sass';
import navigationArrow from 'img/disclosure-indicator-blue.svg';


export default class ExplainerNav extends Component {
  render() {
    const { leftNavigationText, rightNavigationText, leftNavHandler, rightNavHandler } = this.props;

    return (
      <div className={ style.explainerNav }>
        <span className='left-nav' onClick={ leftNavHandler }>
          <img className='arrow' src={ navigationArrow }/>
          <div className='text'>{ leftNavigationText }</div>
        </span>
        <span className='right-nav' onClick={ rightNavHandler }>
          <div className='text'>{ rightNavigationText }</div>
          <img className='arrow' src={ navigationArrow }/>
        </span>
      </div>
    );
  }
}

ExplainerNav.propTypes = {
  leftNavigationText: PropTypes.string,
  rightNavigationText: PropTypes.string,
  leftNavHandler: PropTypes.func,
  rightNavHandler: PropTypes.func,
};

