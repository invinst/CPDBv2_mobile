import React, { PropTypes } from 'react';

import LocationMap from 'components/common/location-map';
import style from './cr-location-map.sass';


const CRLocationMap = ({ lng, lat }) => {
  const marker = (
    <div className='marker' />
  );

  return (
    <div className={ style.crLocationMap }>
      <LocationMap
        lat={ lat }
        lng={ lng }
        zoomOutLevel={ 8 }
        zoomInLevel={ 13 }
        mapboxStyle='mapbox://styles/mapbox/streets-v10'
        markerEl={ marker } />
    </div>
  );
};


CRLocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
};

export default CRLocationMap;
