import React, { Component, PropTypes } from 'react';

import style from './location.sass';
import TRRMap from 'components/trr-page/location/trr-map';


class Location extends Component {
  render() {
    const { address, locationType, beat, point } = this.props;

    return (
      <div className={ style.location }>
        <div className='location-header'>LOCATION</div>
        <div className='map'>
          { point ? <TRRMap lng={ point.lng } lat={ point.lat }/> : null }
        </div>
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
  point: PropTypes.object,
};

export default Location;
