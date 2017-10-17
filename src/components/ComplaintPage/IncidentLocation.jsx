import React, { PropTypes, Component } from 'react';

import { Map, Marker, TileLayer } from 'react-leaflet';

import constants from 'constants';
import SectionTitle from 'components/ComplaintPage/SectionTitle';

import 'leaflet/dist/leaflet.css';
import style from 'styles/ComplaintPage/IncidentLocation.sass';

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
          className='map'
          center={ [lat, lng] }
          zoom={ this.state.zoomLevel }
          onClick={ this.switchZoomLevel.bind(this) }
          scrollWheelZoom={ false }
          doubleClickZoom={ false }
          zoomControl={ false }
          attributionControl={ false }
          dragging={ false }
        >
          <TileLayer url={ tileUrl } />
          { marker }
        </Map>

        <table className='captions'>

          <tr className='row'>
            <td className='title'>Address</td>
            <td className='address'>
              <a
                href={ `http://maps.google.com/maps?&z=${this.state.zoomLevel}&q=${lat}+${lng}&ll=${lat}+${lng}` }
                target='_blank'
                rel='noopener'
              >
                { address }
              </a>
            </td>
          </tr>

          <tr className='row'>
            <td className='title'>Location Type</td>
            <td className='value'>{ locationText }</td>
          </tr>

          <tr className='row'>
            <td className='title'>Beat</td>
            <td className='value'>{ beatText }</td>
          </tr>
        </table>

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
