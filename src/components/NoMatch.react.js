import React from 'react';
import MainPage from 'components/MainPage.react';


const NoMatch = React.createClass({
  render() {
    return (
      <MainPage showError={ true } />
    );
  }
});

export default NoMatch;
