import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './trr-map.sass';
import LocationMap from 'components/common/location-map';


export default class TRRMap extends Component {

  render() {
    const { lng, lat } = this.props;
    const marker = (
      <div className={ style.trrMapMarker }>
        <div className='outer-circle'/>
      </div>
    );

    return (
      <LocationMap
        lat={ lat }
        lng={ lng }
        mapboxStyle='mapbox://styles/mapbox/light-v9'
        markerEl={ marker }
      />
    );
  }
}

TRRMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};
