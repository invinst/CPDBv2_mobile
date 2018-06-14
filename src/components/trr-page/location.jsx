import React, { Component, PropTypes } from 'react';

import style from 'styles/trr-page/location.sass';


class Location extends Component {
  render() {
    const { address, locationType, beat } = this.props;

    return (
      <div className={ style.location }>
        <div className='location-header'>LOCATION</div>
        <div className='map'>MAP FPO</div>
        <div className='row'>
          <div className='title'>Address</div>
          <div className='value'>{ address }</div>
        </div>
        <div className='row'>
          <div className='title'>Location Type</div>
          <div className='value'>{ locationType }</div>
        </div>
        <div className='row'>
          <div className='title'>Beat</div>
          <div className='value'>{ beat }</div>
        </div>
      </div>
    );
  }
}


Location.propTypes = {
  address: PropTypes.string,
  locationType: PropTypes.string,
  beat: PropTypes.string,
};

export default Location;
