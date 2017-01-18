import cx from 'classnames';
import React from 'react';

import style from 'styles/MainPage/MainPageContent/Header.sass';


const Header = React.createClass({
  propTypes: {
    topLeft: React.PropTypes.number
  },

  render() {
    const topLeft = this.props.topLeft;

    return (
      <div className={ cx(style.header, 'row animation', { 'top-left': topLeft }) }>
        <div className='cpdb-logo one-half column align-left'>cpdp</div>
      </div>
    );
  }
});

export default Header;
