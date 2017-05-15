import React from 'react';

import style from 'styles/MainPage/MainPageContent/Header.sass';


const Header = React.createClass({
  render() {

    return (
      <div className={ style.header }>
        <div className='cpdb-logo'>cpdp</div>
      </div>
    );
  }
});

export default Header;
