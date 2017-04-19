import React, { PropTypes, Component } from 'react';

import { Map, Marker, TileLayer } from 'react-leaflet';

import constants from 'constants';
import Arrow from 'components/Shared/Arrow';
import SectionTitle from 'components/ComplaintPage/SectionTitle';

import 'leaflet/dist/leaflet.css';
import style from 'styles/ComplaintPage/IncidentLocation.sass';
import gmapsIcon from 'img/ic-google-maps.svg';

const markerIcon = L.divIcon({
  className: 'marker-icon',
  iconSize: [4, 4]
});

const tileUrl = `http://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${constants.MAPBOX_TOKEN}`;

export const ZOOMED_OUT_LEVEL = 10;
export const ZOOMED_IN_LEVEL = 14;

export default class IncidentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: ZOOMED_OUT_LEVEL
    };
  }

  switchZoomLevel() {
    const newZoomLevel = (this.state.zoomLevel === ZOOMED_OUT_LEVEL) ? ZOOMED_IN_LEVEL : ZOOMED_OUT_LEVEL;
    this.setState({
      zoomLevel: newZoomLevel
    });
  }

  render() {
    const { point, beat, address, location } = this.props;

    // Focus on Chicago by default
    let lat = 41.8781;
    let lng = -87.6298;
    let marker = null;

    if (typeof point === 'object') {
      lat = point.lat;
      lng = point.long;
      marker = <Marker position={ [lat, lng] } icon={ markerIcon } />;
    }

    let beatText = 'Unknown';
    let locationText = 'Unknown';
    if (beat && beat.name) {
      beatText = beat.name;
    }
    if (location) {
      locationText = location;
    }

    return (
      <div className={ style.incidentLocation }>

        <SectionTitle title='Location' />

        <Map
          center={ [lat, lng] }
          zoom={ this.state.zoomLevel }
          onClick={ () => { this.switchZoomLevel(); } }
          scrollWheelZoom={ false }
          doubleClickZoom={ false }
          zoomControl={ false }
          attributionControl={ false }
          dragging={ false }
        >
          <TileLayer url={ tileUrl } />
          { marker }
        </Map>

        <div className='captions'>

          <a
            className='row'
            href={ `http://maps.google.com/maps?&z=${this.state.zoomLevel}&q=${lat}+${lng}&ll=${lat}+${lng}` }
            target='_blank'
            rel='noopener'
          >
            <img className='google-maps-icon' src={ gmapsIcon } alt='Google Maps' />
            <span className='address'>{ address }</span>
            <span className='arrow'><Arrow direction='right' /></span>
          </a>

          <div className='row'>
            <span className='title'>Location</span>
            <span className='value'>{ locationText }</span>
          </div>

          <div className='row'>
            <span className='title'>Beat</span>
            <span className='value'>{ beatText }</span>
          </div>
        </div>

      </div>
    );
  }
}

IncidentLocation.propTypes = {
  address: PropTypes.string,
  point: PropTypes.object,
  beat: PropTypes.object,
  location: PropTypes.string
};
