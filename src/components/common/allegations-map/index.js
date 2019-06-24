import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import { isIOS } from 'react-device-detect';
import MultiTouch from 'mapbox-gl-multitouch';

import constants from 'constants';
import { mapboxgl } from 'utils/mapbox';
import Legend from './legend/index';
import MarkerTooltip from './marker-tooltip';
import SimpleMarkerTooltip from './simple-marker-tooltip';
import Marker from './marker';
import styles from './allegations-map.sass';
import withLoadingSpinner from 'components/common/with-loading-spinner';

export default class AllegationsMap extends Component {
  constructor(props) {
    super(props);
    this.currentMarkers = [];
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!isEmpty(this.currentMarkers)) {
      this.currentMarkers.map(currentMarker => currentMarker.remove());
    }
    this.currentMarkers = [];
    nextProps.markers.map(marker => {
      this.addMarker(marker);
    });
  }

  gotRef(el) {
    if (el && !this.map) {
      this.map = new mapboxgl.Map({
        container: el,
        style: constants.MAPBOX_STYLE,
        zoom: constants.MAP_INFO.ZOOM1,
        center: [constants.MAP_INFO.CENTER_LNG, constants.MAP_INFO.CENTER_LAT],
        interactive: true,
        scrollZoom: false,
      });
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
      if (isIOS) {
        /* istanbul ignore next */
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
    if (marker.kind === constants.MAP_ITEMS.CR) {
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
    } else if (marker.kind === constants.MAP_ITEMS.FORCE) {
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
    this.currentMarkers.push(this.marker);

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

AllegationsMap.propTypes = {
  legend: PropTypes.shape({
    allegationCount: PropTypes.number,
    unsustainedCount: PropTypes.number,
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

AllegationsMap.defaultProps = {
  legend: {},
  markers: []
};

export const AllegationsMapWithSpinner = withLoadingSpinner(AllegationsMap, styles.allegationMapLoading);
