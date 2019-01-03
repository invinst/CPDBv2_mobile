import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import cx from 'classnames';

import { MAP_INFO, MAP_ITEMS, MAPBOX_STYLE } from 'constants/officer-page/tabbed-pane-section/map';
import { mapboxgl } from 'utils/mapbox';
import Legend from './legend/index';
import MarkerTooltip from './marker-tooltip';
import SimpleMarkerTooltip from './simple-marker-tooltip';
import Marker from './marker';
import styles from './map.sass';
import { isIOS } from "react-device-detect";
import MultiTouch from 'mapbox-gl-multitouch';

export default class Map extends Component {
  componentWillReceiveProps(nextProps, nextState) {
    nextProps.markers.map(marker => {
      this.addMarker(marker);
    });
  }

  gotRef(el) {
    if (el && !this.map) {
      this.map = new mapboxgl.Map({
        container: el,
        style: MAPBOX_STYLE,
        zoom: MAP_INFO.ZOOM1,
        center: [MAP_INFO.CENTER_LNG, MAP_INFO.CENTER_LAT],
        interactive: true,
        scrollZoom: false,
      });
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
      if (isIOS) {
        this.map.addControl(new MultiTouch());
      }

      this.props.markers.map(marker => {
        this.addMarker(marker);
      });
    }
  }

  createPopup(marker) {
    const popup = new mapboxgl.Popup({ offset: 0, closeButton: false });
    let tooltip;
    if (marker.kind === MAP_ITEMS.CR) {
      tooltip = (
        <MarkerTooltip
          id={ marker.id }
          url={ `/complaint/${marker.id}/` }
          kind={ marker.kind }
          category={ marker.category }
          coaccused={ marker.coaccused }
          victims={ marker.victims }
        />
      );
    } else if (marker.kind === MAP_ITEMS.FORCE) {
      tooltip = (
        <SimpleMarkerTooltip
          kind='TRR'
          id={ marker.id }
          url={ `/trr/${marker.id}/` }
          category={ marker.category }
        />
      );
    }
    popup.setHTML(ReactDOMServer.renderToString(tooltip));
    return popup;
  }

  addMarker(marker) {
    const popup = this.createPopup(marker);

    const markerEl = document.createElement('div');
    this.marker = new mapboxgl.Marker(markerEl);
    this.marker.setLngLat([marker.point.lon, marker.point.lat]);
    this.marker.setPopup(popup);
    this.marker.addTo(this.map);

    ReactDOM.render(
      <Marker
        kind={ marker.kind }
        finding={ marker.finding }
      />,
      markerEl
    );
  }

  render() {
    const { legend } = this.props;
    return (
      <div className={ cx(styles.map, 'test--map') }>
        <div ref={ this.gotRef.bind(this) } className='map-tab'/>
        <Legend legend={ legend } />
      </div>
    );
  }
}

Map.propTypes = {
  legend: PropTypes.shape({
    allegationCount: PropTypes.number,
    sustainedCount: PropTypes.number,
    useOfForceCount: PropTypes.number
  }),
  markers: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        point: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number
        }),
        kind: PropTypes.string,
        finding: PropTypes.string,
        id: PropTypes.string,
        category: PropTypes.string,
        coaccused: PropTypes.number,
        victims: PropTypes.arrayOf(
          PropTypes.shape({
            gender: PropTypes.string,
            race: PropTypes.string,
            age: PropTypes.number,
          })
        )
      })
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        point: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number
        }),
        kind: PropTypes.string,
        id: PropTypes.string,
        category: PropTypes.string,
      })
    ),
  ])
};

Map.defaultProps = {
  legend: {
    allegationCount: 0,
    sustainedCount: 0,
    useOfForceCount: 0
  },
  markers: []
};
