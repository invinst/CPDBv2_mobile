import React, { PropTypes } from 'react';

import CRLocationMap from './cr-location-map';
import style from './location.sass';


const Location = ({ point, address, location, beat }) => (
  <div className={ style.location }>
    <div className='header'>LOCATION</div>
    {
      point ? <CRLocationMap lng={ point.lon } lat={ point.lat }/> : null
    }
    <div className='location-info-item address'>
      <div className='label'>Address</div>
      <div className='info'>{ address }</div>
    </div>
    <div className='location-info-item type'>
      <div className='label'>Location Type</div>
      <div className='info'>{ location }</div>
    </div>
    <div className='location-info-item beat'>
      <div className='label'>Beat</div>
      <div className='info'>{ beat }</div>
    </div>
  </div>
);

Location.propTypes = {
  point: PropTypes.object,
  address: PropTypes.string,
  location: PropTypes.string,
  beat: PropTypes.string
};

Location.defaultProps = {
  point: {}
};

export default Location;
